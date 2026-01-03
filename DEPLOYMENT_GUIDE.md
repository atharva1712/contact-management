# Deployment Guide: Vercel (Frontend) + Render (Backend)

Complete step-by-step guide to deploy your Contact Management App from one Git repository.

---

## 📋 Prerequisites

1. **Git Repository**: Your project should be on GitHub, GitLab, or Bitbucket
2. **MongoDB Atlas Account**: Free tier is sufficient
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
4. **Render Account**: Sign up at [render.com](https://render.com)

---

## 🗄️ Step 1: Setup MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a free M0 cluster (takes 1-3 minutes)

### 1.2 Configure Database Access
1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create username and password (save these!)
5. Set user privileges to **"Read and write to any database"**
6. Click **"Add User"**

### 1.3 Configure Network Access
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development) or add specific IPs
4. Click **"Confirm"**

### 1.4 Get Connection String
1. Click **"Database"** → **"Connect"**
2. Choose **"Connect your application"**
3. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password
5. Add database name at the end: `/contactapp?retryWrites=true&w=majority`

**Save this connection string - you'll need it for Render!**

---

## 🚀 Step 2: Deploy Backend to Render

### 2.1 Prepare Your Repository
1. Push your code to GitHub (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/contact-app.git
   git push -u origin main
   ```

### 2.2 Create Render Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your Git repository:
   - Click **"Connect account"** if needed
   - Find and select your repository
   - Click **"Connect"**

### 2.3 Configure Backend Service
Fill in the following settings:

**Basic Settings:**
- **Name**: `contact-backend` (or any name you prefer)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend` (important!)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**
Click **"Add Environment Variable"** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` (Render provides this, but set as fallback) |
| `MONGODB_URI` | Your MongoDB Atlas connection string from Step 1.4 |
| `FRONTEND_URL` | Leave empty for now, we'll update after frontend is deployed |

**Example MONGODB_URI:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/contactapp?retryWrites=true&w=majority
```

### 2.4 Deploy Backend
1. Click **"Create Web Service"**
2. Render will start building and deploying your backend
3. Wait 2-5 minutes for deployment to complete
4. Once deployed, you'll see a URL like: `https://contact-backend.onrender.com`
5. **Copy this URL** - you'll need it for frontend configuration

### 2.5 Verify Backend is Working
1. Visit: `https://your-backend-url.onrender.com/api/health`
2. You should see: `{"status":"OK","message":"Server is running"}`
3. If you see an error, check the logs in Render dashboard

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository:
   - Find and select your repository
   - Click **"Import"**

### 3.2 Configure Frontend Settings
Fill in the following:

**Framework Preset:**
- **Framework Preset**: `Vite`
- **Root Directory**: `frontend` (click **"Edit"** and change from `/` to `/frontend`)

**Build and Output Settings:**
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

**Environment Variables:**
Click **"Add"** and add:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | Your Render backend URL from Step 2.4 (e.g., `https://contact-backend.onrender.com`) |

⚠️ **Important**: Include `https://` in the URL, no trailing slash!

### 3.3 Deploy Frontend
1. Click **"Deploy"**
2. Vercel will build and deploy your frontend (takes 1-2 minutes)
3. Once deployed, you'll get a URL like: `https://contact-app.vercel.app`
4. **Copy this frontend URL** - you need it for the next step!

---

## 🔄 Step 4: Update Backend CORS Settings

### 4.1 Update Render Environment Variable
1. Go back to [Render Dashboard](https://dashboard.render.com)
2. Select your backend service
3. Go to **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Vercel frontend URL from Step 3.3 (e.g., `https://contact-app.vercel.app`)
6. Click **"Save Changes"**
7. Render will automatically redeploy with the new environment variable

### 4.2 Wait for Redeployment
- Render will redeploy (takes 1-2 minutes)
- Check the logs to ensure deployment is successful

---

## ✅ Step 5: Test Your Deployment

### 5.1 Test Frontend
1. Visit your Vercel URL: `https://your-app.vercel.app`
2. The app should load correctly

### 5.2 Test Contact Form
1. Fill out the contact form
2. Submit a contact
3. Check if it appears in the contact list
4. If there are errors, check browser console (F12)

### 5.3 Test Backend API Directly
Visit: `https://your-backend.onrender.com/api/contacts`
- You should see: `{"success":true,"count":0,"data":[]}` (or contacts if you submitted any)

---

## 🐛 Troubleshooting

### Frontend shows "Network Error" or "Failed to fetch"
**Problem**: Frontend can't connect to backend
**Solution**:
1. Check `VITE_API_URL` in Vercel environment variables
2. Ensure backend URL includes `https://`
3. Verify backend is running (check Render logs)
4. Check CORS settings in backend

### Backend shows CORS error
**Problem**: Backend blocking frontend requests
**Solution**:
1. Verify `FRONTEND_URL` in Render environment variables
2. Make sure it matches your Vercel URL exactly
3. Redeploy backend after updating environment variables

### Backend shows "MongoDB connection error"
**Problem**: Can't connect to MongoDB
**Solution**:
1. Check `MONGODB_URI` in Render environment variables
2. Verify MongoDB Atlas Network Access allows all IPs (0.0.0.0/0)
3. Ensure password in connection string is URL-encoded if it contains special characters
4. Check MongoDB Atlas database user has read/write permissions

### Build fails on Vercel
**Problem**: Frontend build error
**Solution**:
1. Check Vercel build logs for specific errors
2. Ensure `Root Directory` is set to `frontend`
3. Verify `Build Command` is `npm run build`
4. Check that all dependencies are in `package.json`

### Build fails on Render
**Problem**: Backend build error
**Solution**:
1. Check Render logs for specific errors
2. Ensure `Root Directory` is set to `backend`
3. Verify `Start Command` is `npm start`
4. Check that `package.json` has a `start` script

---

## 🔄 Step 6: Continuous Deployment

### Both platforms automatically deploy when you push to Git!

**To update your app:**
1. Make changes locally
2. Commit and push to your repository:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. Both Vercel and Render will automatically:
   - Detect the push
   - Build the new version
   - Deploy automatically

---

## 📝 Environment Variables Summary

### Render (Backend) Environment Variables:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/contactapp?retryWrites=true&w=majority
FRONTEND_URL=https://your-app.vercel.app
```

### Vercel (Frontend) Environment Variables:
```
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🎉 Success Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Backend deployed to Render with health check passing
- [ ] Frontend deployed to Vercel and loading correctly
- [ ] Frontend can submit contacts successfully
- [ ] Contacts appear in the list
- [ ] Delete functionality works
- [ ] Both services automatically redeploy on Git push

---

## 💡 Pro Tips

1. **Custom Domains**: Both Vercel and Render support custom domains (free on Vercel, paid on Render)

2. **Monitoring**: 
   - Render shows logs in the dashboard
   - Vercel shows analytics and logs

3. **Free Tier Limits**:
   - **Render**: Free tier sleeps after 15 minutes of inactivity (first request may be slow)
   - **Vercel**: Generous free tier, no sleeping

4. **Environment Variables**: Never commit `.env` files to Git. Always use platform environment variables.

5. **Testing**: Test your app thoroughly after deployment before sharing the URL.

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)

---

**Your app is now live! 🚀**

If you encounter any issues, check the logs in both platforms' dashboards for detailed error messages.

