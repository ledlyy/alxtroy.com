# Application Logs

This directory contains all application logs that are automatically committed to GitHub.

## Log Files

- `app-YYYY-MM-DD.log` - General application logs (info, warnings, errors)
- `error-YYYY-MM-DD.log` - Error-only logs
- `cron.log` - Cron job execution logs

## Log Rotation

Logs are automatically rotated daily and kept for 30 days.

## Viewing Logs

```bash
# View today's logs
npm run logs:view

# View today's errors
npm run logs:errors

# View all logs
cat logs/app-*.log

# View latest logs
tail -f logs/app-$(date +%Y-%m-%d).log
```

## Automatic Commits

Logs are automatically committed to GitHub. See `scripts/commit-logs.js` for details.

To manually commit logs:
```bash
npm run logs:commit
```

To set up automatic commits via cron:
```bash
npm run logs:setup
```

## Log Structure

Each log entry contains:
- Timestamp
- Log level (info, warn, error)
- Message
- Metadata (request details, user agent, IP, etc.)

Example:
```json
{
  "level": "info",
  "message": "HTTP Request",
  "timestamp": "2025-10-14 15:30:45",
  "type": "request",
  "method": "GET",
  "url": "/about",
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0..."
}
```
