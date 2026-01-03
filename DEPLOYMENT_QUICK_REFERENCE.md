# Deployment Quick Reference

## 📍 Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas

---

## 🔑 Environment Variables

### Render (Backend)
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/contactapp?retryWrites=true&w=majority
FRONTEND_URL=https://your-app.vercel.app
```

### Vercel (Frontend)
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🚀 Render Settings (Backend)

| Setting | Value |
|---------|-------|
| Root Directory | `backend` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Health Check Path | `/api/health` |

---

## 🎨 Vercel Settings (Frontend)

| Setting | Value |
|---------|-------|
| Framework Preset | `Vite` |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

---

## ✅ Deployment Checklist

### Before Deployment
- [ ] Code pushed to GitHub/GitLab/Bitbucket
- [ ] MongoDB Atlas cluster created
- [ ] MongoDB user created with read/write permissions
- [ ] Network Access configured (allow all IPs for testing)

### Backend (Render)
- [ ] Service created with correct root directory
- [ ] All environment variables set
- [ ] Health check endpoint working
- [ ] MongoDB connection successful

### Frontend (Vercel)
- [ ] Project imported from Git
- [ ] Root directory set to `frontend`
- [ ] VITE_API_URL environment variable set
- [ ] Build successful
- [ ] Site accessible

### After Deployment
- [ ] Update FRONTEND_URL in Render
- [ ] Test contact form submission
- [ ] Test contact list display
- [ ] Test delete functionality
- [ ] Verify CORS is working

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| CORS error | Update FRONTEND_URL in Render, include https:// |
| API not connecting | Check VITE_API_URL in Vercel, no trailing slash |
| MongoDB connection failed | Verify MONGODB_URI, check Network Access in Atlas |
| Build failed | Check logs, verify root directory settings |
| 404 on refresh | Vercel routing should handle this automatically |

---

## 📝 Git Commands

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main

# Updates
git add .
git commit -m "Update message"
git push origin main
```

---

## 🔗 Testing URLs

After deployment, test these URLs:

**Backend:**
- Health: `https://your-backend.onrender.com/api/health`
- Contacts: `https://your-backend.onrender.com/api/contacts`

**Frontend:**
- App: `https://your-app.vercel.app`

---

**For detailed instructions, see `DEPLOYMENT_GUIDE.md`**

