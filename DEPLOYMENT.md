# Deployment Guide: first-Step on Vercel

## Quick Deploy (One-Click)

### Option 1: Deploy from GitHub
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import repository: `raviakbar97/first-Step`
4. Click "Deploy"

### Option 2: Using Vercel CLI
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Clone the repo
git clone git@github.com:raviakbar97/first-Step.git
cd first-Step

# Deploy
vercel
```

## Configuration

The first-Step app is a simple Node.js Express server and should work out-of-the-box on Vercel. No additional configuration needed.

### Environment Variables (Optional)
- `PORT`: Vercel sets this automatically (default: 3000)
- `NODE_ENV`: Set to `production` for production builds

## Custom Domain (Optional)

After deployment:
1. Go to project settings in Vercel
2. Click "Domains"
3. Add your custom domain (e.g., `firststep.yourdomain.com`)

## Access After Deployment

Once deployed, your app will be available at:
- `https://first-step-<random-id>.vercel.app`
- Or your custom domain if configured

## Testing the Deployment

### 1. Basic Access Test
```bash
curl https://your-app-url.vercel.app
```

Should return the HTML page with local CodeMirror references.

### 2. Check for CDN References
```bash
curl https://your-app-url.vercel.app | grep "cdnjs"
```

Should return nothing (no CDN references).

### 3. Verify Local Files
```bash
curl -I https://your-app-url.vercel.app/lib/codemirror/codemirror.min.js
```

Should return `200 OK` with `Content-Type: application/javascript`.

### 4. Test Editor Functionality
1. Open https://your-app-url.vercel.app
2. Try typing in the HTML, CSS, or JavaScript editor
3. Click "Run" to execute code
4. Check console output for logs

## Troubleshooting

### Issue: "404 Not Found" on CodeMirror files
**Solution**: Make sure `public/lib/codemirror/` files are committed to Git.

### Issue: Editor not editable
**Solution**: Check browser console for errors. Verify CodeMirror files are loading correctly.

### Issue: Build fails
**Solution**: Check that `package.json` has correct `start` script:
```json
"scripts": {
  "start": "node server/index.js"
}
```

### Issue: Port in use error
**Solution**: Vercel sets `PORT` environment variable. Make sure server uses it:
```javascript
const PORT = process.env.PORT || 3000;
```
(This is already configured in server/index.js)

## Performance Optimization

The first-Step app is already optimized:
- Local CodeMirror files (no CDN latency)
- Minified CSS/JS
- Efficient Express middleware
- Static file serving with proper caching

## Monitoring

Vercel provides:
- Real-time analytics
- Performance monitoring
- Error tracking
- Uptime monitoring

Access via Vercel Dashboard → Your Project → Analytics

## Scaling

The app is stateless and can scale automatically:
- Vercel handles scaling automatically
- Serverless functions scale based on traffic
- No database required (uses localStorage)

## Security

- CORS enabled for cross-origin requests
- vm2 sandbox for code execution
- No sensitive data in localStorage
- HTTPS by default on Vercel

## Rollback

If you need to rollback:
1. Go to Vercel Dashboard → Your Project
2. Click "Deployments"
3. Find the previous deployment
4. Click "..." → "Promote to Production"

## Updates

To update the app:
```bash
# Make changes locally
git add .
git commit -m "Your changes"
git push

# Vercel auto-deploys on push to main branch
```

## Demo URL

After successful deployment, update the README.md with your demo URL:
```markdown
## 🔗 Links
- GitHub: https://github.com/raviakbar97/first-Step
- Demo: https://your-app-url.vercel.app
```

---

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Express Guide](https://vercel.com/guides/express)
- [Node.js on Vercel](https://vercel.com/guides/node)

---

**Status**: Ready for deployment ✅
**Last Updated**: February 13, 2026
