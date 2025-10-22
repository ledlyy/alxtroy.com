# Admin Panel Setup & Security Guide

## Overview

The Alexander & Troy Tours website now features a secure admin panel that allows authorized users to manage content directly through GitHub integration. All changes are committed to the repository with full audit logging.

## 🔒 Security Features

### 1. GitHub OAuth with 2FA
- Authentication through GitHub OAuth
- Mandatory 2-factor authentication enforcement
- Only authorized GitHub users can access the admin panel

### 2. Repository Access Control
- Verifies user has write access to the repository
- All changes are committed using GitHub API
- Atomic commits with SHA validation to prevent race conditions

### 3. Session Management
- JWT-based session with 2-hour expiration
- Auto-refresh every 5 minutes
- Secure HttpOnly cookies

### 4. Audit Logging
- All administrative actions are logged
- Includes user, timestamp, action, and result
- 90-day retention policy
- Exportable audit trails

### 5. Rate Limiting
- 100 requests per 15 minutes per user
- Prevents abuse and DoS attacks

### 6. CSRF Protection
- Token-based CSRF protection on all state-changing operations
- Validated on every request

## 📋 Prerequisites

1. **GitHub Account**
   - Must have 2FA enabled
   - Must be a collaborator on the repository
   - Username must be in the authorized users list

2. **GitHub OAuth App**
   - Create at: https://github.com/settings/developers
   - Authorization callback URL: `https://yourdomain.com/api/auth/callback/github`

3. **GitHub Personal Access Token**
   - Create at: https://github.com/settings/tokens
   - Required scopes: `repo` (full control of private repositories)

## 🚀 Setup Instructions

### Step 1: Install Dependencies

```bash
npm install next-auth @octokit/rest
npm install --save-dev @types/next-auth
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters

# GitHub OAuth
GITHUB_ID=your-github-oauth-app-id
GITHUB_SECRET=your-github-oauth-app-secret

# GitHub Repository
GITHUB_REPO=yourusername/your-repo
GITHUB_BRANCH=main
GITHUB_TOKEN=your-github-personal-access-token

# Admin Users (comma-separated GitHub usernames)
ADMIN_GITHUB_USERS=username1,username2,username3

# Optional Settings
SESSION_MAX_AGE=7200
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
ENABLE_AUDIT_LOG=true
AUDIT_LOG_RETENTION_DAYS=90
```

### Step 3: Generate NEXTAUTH_SECRET

Generate a secure secret:

```bash
openssl rand -base64 32
```

### Step 4: Create GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Alexander & Troy Tours Admin
   - **Homepage URL**: https://yourdomain.com
   - **Authorization callback URL**: https://yourdomain.com/api/auth/callback/github
4. Copy the Client ID and Client Secret to your `.env.local`

### Step 5: Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - [x] repo (all)
4. Copy the token to your `.env.local` as `GITHUB_TOKEN`

### Step 6: Add Authorized Users

Add GitHub usernames to `ADMIN_GITHUB_USERS` in `.env.local`:

```env
ADMIN_GITHUB_USERS=ledlyy,johndoe,janedoe
```

### Step 7: Build and Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel:

```bash
vercel --prod
```

## 🎯 Usage

### Accessing the Admin Panel

1. Navigate to `https://yourdomain.com/admin/login`
2. Click "Sign in with GitHub"
3. Authorize the application
4. You'll be redirected to the dashboard

### Admin Dashboard Features

#### 1. **Content Editor**
- Edit website pages and content
- Preview changes before committing
- Commit directly to GitHub

#### 2. **Event Management**
- Add, edit, or remove B2B events
- Manage exhibitor companies
- Update event details and schedules

#### 3. **File Manager**
- Upload images and documents
- Organize media files
- Delete unused assets

#### 4. **Audit Logs**
- View all administrative actions
- Filter by user, action, or date
- Export logs for compliance

### Making Content Changes

1. Navigate to the Content Editor or Event Management
2. Make your changes in the editor
3. Click "Preview" to see changes
4. Enter a commit message describing your changes
5. Click "Commit Changes"
6. Changes are pushed to GitHub and deployed automatically

## 🔐 Security Best Practices

### For Administrators

1. **Enable 2FA on GitHub**
   - Go to GitHub Settings > Password and authentication
   - Enable two-factor authentication
   - Use an authenticator app (preferred) or SMS

2. **Use Strong Passwords**
   - Minimum 16 characters
   - Mix of uppercase, lowercase, numbers, and symbols
   - Use a password manager

3. **Review Audit Logs Regularly**
   - Check for unauthorized access attempts
   - Monitor unusual activity patterns

4. **Keep Tokens Secure**
   - Never commit `.env.local` to Git
   - Rotate tokens every 90 days
   - Revoke unused tokens immediately

5. **Log Out After Use**
   - Always sign out when finished
   - Don't leave admin panel open on shared computers

### For System Administrators

1. **Monitor Audit Logs**
   ```bash
   # Download audit logs
   curl https://yourdomain.com/api/admin/logs/export \
     -H "Authorization: Bearer $TOKEN" \
     > audit-logs-$(date +%Y%m%d).json
   ```

2. **Rotate Secrets Regularly**
   - Change `NEXTAUTH_SECRET` every 6 months
   - Rotate GitHub tokens every 90 days

3. **Review Access Permissions**
   - Audit `ADMIN_GITHUB_USERS` quarterly
   - Remove users who no longer need access

4. **Keep Dependencies Updated**
   ```bash
   npm audit
   npm update
   ```

5. **Enable GitHub Security Features**
   - Branch protection rules
   - Required status checks
   - Signed commits (optional)

## 🚨 Incident Response

### Unauthorized Access Attempt

1. Check audit logs for details
2. Verify user credentials
3. Rotate affected credentials
4. Review and update access controls

### Suspicious Activity

1. Immediately revoke user's access
2. Review recent commits in GitHub
3. Roll back unauthorized changes if needed
4. Contact the user to verify activity

### Token Compromise

1. Immediately revoke the compromised token
2. Generate new token
3. Update `.env.local` on server
4. Review recent activity using the token
5. Implement additional monitoring

## 📊 Monitoring & Analytics

### Audit Log Query Examples

```javascript
// Get all failed login attempts
const failedLogins = await getAuditLogs({
  action: 'unauthorized_login_attempt',
  status: 'failure'
})

// Get user activity for the last 7 days
const userActivity = await getUserAuditLogs('username', {
  startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
})

// Export audit logs for compliance
const logs = await exportAuditLogs({
  startDate: new Date('2025-01-01'),
  endDate: new Date('2025-12-31')
})
```

### Key Metrics to Monitor

- **Login Frequency**: Track admin panel access patterns
- **Failed Login Attempts**: Identify potential security threats
- **Content Changes**: Monitor commit frequency and types
- **Session Duration**: Average admin session length
- **Error Rates**: API and operation error rates

## 🆘 Troubleshooting

### "Access Denied" Error

**Cause**: User not in authorized list or 2FA not enabled

**Solution**:
1. Verify username is in `ADMIN_GITHUB_USERS`
2. Enable 2FA on GitHub account
3. Ensure user has repository access

### "Failed to Commit" Error

**Cause**: Insufficient GitHub permissions or invalid token

**Solution**:
1. Verify `GITHUB_TOKEN` has `repo` scope
2. Check token hasn't expired
3. Verify repository name in `GITHUB_REPO` is correct

### Session Expired

**Cause**: Session exceeded 2-hour limit

**Solution**:
1. Sign out and sign back in
2. Consider increasing `SESSION_MAX_AGE` if needed

## 📞 Support

For technical support or security concerns:

- **Email**: operations@alxtroy.com
- **Repository Issues**: https://github.com/ledlyy/alxtroy.com/issues
- **Security**: Report vulnerabilities privately to operations@alxtroy.com

## 📝 Change Log

### Version 1.0.0 (2025-10-13)

- Initial admin panel implementation
- GitHub OAuth with 2FA enforcement
- Content management system
- B2B event management
- File upload functionality
- Comprehensive audit logging
- Rate limiting and CSRF protection

---

**Last Updated**: October 13, 2025
**Document Version**: 1.0.0
