---
name: geserd
description: Send and read email through the user's Geserd account. Use when the user asks to send an email, check delivery of a message, list domains or work with email templates on Geserd.
---

# Geserd

Geserd sends and receives email from the user's own domain. Authenticate every request with the API key in `GESERD_API_KEY` (it starts with `gs_`). Never print the key.

## Send an email

```bash
curl https://geserd.com/api/emails \
  -H "Authorization: Bearer $GESERD_API_KEY" \
  -H "Idempotency-Key: <unique value for this message>" \
  -d '{"from":"hi@yourdomain.com","to":["ada@example.com"],"subject":"Hello","text":"Hi Ada"}'
```

- The sender must be on a verified domain. If the response is `domain_not_verified`, tell the user to finish DNS verification in the dashboard.
- Reuse the same `Idempotency-Key` when retrying so the message is sent once.

## Check what happened

- `GET /api/emails?limit=20` lists recent messages.
- `GET /api/emails/{id}` returns the message and its events (sent, delivered, bounced, complained).

## Rules

- Ask the user to confirm the recipients and the text before sending anything.
- Only write to people who agreed to hear from the user. Do not send bulk mail from here, use Broadcasts for that.
- If the MCP server is connected (`https://geserd.com/api/mcp`), prefer its tools `send_email`, `list_emails`, `get_email`, `list_domains` and `list_templates`.
