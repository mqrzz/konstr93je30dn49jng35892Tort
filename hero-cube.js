// Hero cube — адаптация присланного WebGL-куба под фиксированный контейнер справа от текста.
// На мобильных (<900px) не инициализируется вообще — .hero-right скрыт в CSS, и грузить
// Three.js + postprocessing там незачем (экономим трафик и батарею).

if (window.innerWidth > 900) {
  const container = document.getElementById('canvasContainer');
  if (container) initHeroCube(container);
}

async function initHeroCube(container) {
  const THREE = await import('three');
  const { default: TWEEN } = await import('tween');
  const { RectAreaLightUniformsLib } = await import('RectAreaLightUniformsLib');
  const { BloomEffect, FXAAEffect, EffectComposer, EffectPass, RenderPass } = await import('postprocessing');

  const CUBES_PER_SIDE = 3;
  function toRadians(a) { return a * (Math.PI / 180); }

  function createBoxWithRoundedEdges(width, height, depth, radius0, smoothness) {
    let shape = new THREE.Shape();
    let eps = 0.00001;
    let radius = radius0 - eps;
    shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
    shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
    shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
    shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
    let geometry = new THREE.ExtrudeGeometry(shape, {
      depth: depth - radius0 * 2, bevelEnabled: true, bevelSegments: smoothness * 2,
      steps: 1, bevelSize: radius, bevelThickness: radius0, curveSegments: smoothness
    });
    geometry.center();
    return geometry;
  }

  function makeCubes() {
    const material = new THREE.MeshStandardMaterial({ color: 0x000000, metalness: 1, roughness: 0.01 });
    const numCubes = CUBES_PER_SIDE;
    const cubes = new THREE.Object3D();
    const offset = (numCubes - 1) / 2;
    for (let i = 0; i < numCubes; i++) {
      const layer = new THREE.Object3D();
      for (let j = 0; j < numCubes; j++) {
        for (let k = 0; k < numCubes; k++) {
          const geom = createBoxWithRoundedEdges(1, 1, 1, .09, 40);
          geom.translate((i - offset) * 1.03, (j - offset) * 1.03, (k - offset) * 1.03);
          layer.add(new THREE.Mesh(geom, material));
        }
      }
      cubes.add(layer);
    }
    const innerWrapper = new THREE.Object3D(); innerWrapper.add(cubes);
    const outerWrapper = new THREE.Object3D(); outerWrapper.add(innerWrapper);
    return outerWrapper;
  }

  function tRotate(cube, delay) {
    if (Math.random() > 0.5) cube.rotateY(Math.PI / 2); else cube.rotateZ(Math.PI / 2);
    const side = cube.children[Math.floor(Math.random() * CUBES_PER_SIDE)];
    const angles = { x: Math.random() > 0.5 ? -Math.PI : Math.PI, y: 0, z: 0 };
    const pause = Math.random() * 1000;
    new TWEEN.Tween(side.rotation).delay(pause).to({
      x: side.rotation.x + angles.x, y: side.rotation.y + angles.y, z: side.rotation.z + angles.z
    }, delay).onComplete(() => setTimeout(tRotate, pause, cube, delay)).start();
  }

  function constructScene() {
    const scene = new THREE.Scene();
    RectAreaLightUniformsLib.init();
    const rectLight1 = new THREE.RectAreaLight(0xffffff, 100, 20, 20);
    rectLight1.position.set(10, 15, 0); rectLight1.rotation.x = Math.PI * 1.5; rectLight1.rotation.y = Math.PI / 4;
    scene.add(rectLight1);
    const rectLight2 = new THREE.RectAreaLight(0xffffff, 5, 20, 20);
    rectLight2.position.set(0, -20, 0); rectLight2.rotation.x = Math.PI / 2;
    scene.add(rectLight2);
    const cube = makeCubes();
    scene.add(cube);
    return { scene, cube };
  }

  let isDragging = false, previousMousePosition = { x: 0, y: 0 };
  function addControls(cube, el) {
    el.addEventListener('mousedown', e => { isDragging = true; previousMousePosition = { x: e.clientX, y: e.clientY }; });
    window.addEventListener('mousemove', e => {
      const deltaMove = { x: e.clientX - previousMousePosition.x, y: e.clientY - previousMousePosition.y };
      if (isDragging) {
        const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(toRadians(deltaMove.y), toRadians(deltaMove.x), 0, 'XYZ'));
        cube.quaternion.multiplyQuaternions(q, cube.quaternion);
      }
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    window.addEventListener('mouseup', () => { isDragging = false; });
    el.addEventListener('touchstart', e => { isDragging = true; const t = e.touches[0]; previousMousePosition = { x: t.clientX, y: t.clientY }; }, { passive: true });
    el.addEventListener('touchmove', e => {
      const t = e.touches[0];
      const deltaMove = { x: t.clientX - previousMousePosition.x, y: t.clientY - previousMousePosition.y };
      if (isDragging) {
        const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(toRadians(deltaMove.y), toRadians(deltaMove.x), 0, 'XYZ'));
        cube.quaternion.multiplyQuaternions(q, cube.quaternion);
      }
      previousMousePosition = { x: t.clientX, y: t.clientY };
    }, { passive: true });
    el.addEventListener('touchend', () => { isDragging = false; });
  }

  function addCamera() {
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 5.2; camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
  }

  function addRendering(scene, camera, container) {
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance', stencil: false, depth: false });
    renderer.autoClear = false;
    container.appendChild(renderer.domElement);
    const bloomPass = new BloomEffect({ luminanceThreshold: 0.9, luminanceSmoothing: 0.7, intensity: 0.8, radius: 0.1 });
    const FXAAPass = new FXAAEffect();
    const composer = new EffectComposer(renderer);
    const size = Math.min(container.clientWidth, container.clientHeight, 460);
    composer.setSize(size, size);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new EffectPass(camera, FXAAPass, bloomPass));
    return composer;
  }

  const { scene, cube } = constructScene();
  const camera = addCamera();
  const composer = addRendering(scene, camera, container);
  tRotate(cube.children[0].children[0], 2000);

  let running = true;
  // ставим на паузу, когда hero вне экрана — не жжём батарею зря на длинных страницах
  const io = new IntersectionObserver(entries => { running = entries[0].isIntersecting; }, { threshold: 0.05 });
  io.observe(container);

  requestAnimationFrame(function render() {
    requestAnimationFrame(render);
    if (!running) return;
    if (!isDragging) {
      cube.children[0].rotation.x += 0.005;
      cube.children[0].rotation.y += 0.005;
      cube.children[0].rotation.z += 0.005;
    }
    TWEEN.update();
    composer.render();
  });

  addControls(cube, container);
}
