# 🚀 Deployment Guide: Stress-Free Trip Planner

## Table of Contents
1. [Understanding Your Hosting Options](#understanding-your-hosting-options)
2. [Option 1: Deploy to Vercel/Netlify (Recommended)](#option-1-deploy-to-vercelnettify-recommended)
3. [Option 2: Static Site on HostAfrica cPanel](#option-2-static-site-on-hostafrica-cpanel)
4. [Option 3: HostAfrica VPS/Cloud Hosting](#option-3-hostafrica-vpscloud-hosting)
5. [Domain Configuration](#domain-configuration)

---

## Understanding Your Hosting Options

### Your Current Setup
- **Framework**: Astro 5.x with SSR (Server-Side Rendering)
- **Adapter**: `@astrojs/node` in standalone mode
- **Requirements**: Node.js 18+, persistent process, dynamic rendering
- **Database**: Supabase (external, cloud-hosted)

### HostAfrica Hosting Types
1. **Shared cPanel Hosting** - PHP/static files only (❌ Not compatible with SSR)
2. **VPS/Cloud Hosting** - Full server control (✅ Compatible)
3. **Domain Registration** - Can point to any hosting provider

---

## Option 1: Deploy to Vercel/Netlify (Recommended) ⭐

**Best for**: Quick deployment, automatic SSL, global CDN, zero configuration

### Why This Option?
- ✅ **Free tier** available (sufficient for most projects)
- ✅ **Automatic deployments** from Git
- ✅ **Built-in SSL** certificates
- ✅ **Global CDN** for fast loading
- ✅ **Perfect Astro SSR support**
- ✅ **Keep your HostAfrica domain** (just point DNS)

### Step-by-Step: Deploy to Vercel

#### 1. Prepare Your Project

```bash
# Ensure your project builds successfully
npm run build

# Test the production build locally
npm run preview
```

#### 2. Push to GitHub (if not already done)

```bash
# Initialize git (if needed)
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

#### 3. Deploy to Vercel

**Via Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel auto-detects Astro - click "Deploy"
5. Wait 2-3 minutes for deployment

**Via Vercel CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### 4. Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add your Supabase credentials:
   - `PUBLIC_SUPABASE_URL` = your_supabase_url
   - `PUBLIC_SUPABASE_ANON_KEY` = your_anon_key
   - `ADMIN_EMAIL` = your_admin_email
3. Redeploy the project

#### 5. Connect Your HostAfrica Domain

**In HostAfrica cPanel:**
1. Login to cPanel
2. Go to **Zone Editor** or **DNS Management**
3. Add/Edit DNS records:

```
Type: A
Name: @ (or your domain)
Value: 76.76.21.21 (Vercel's IP)

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**In Vercel Dashboard:**
1. Go to Project Settings → Domains
2. Click "Add Domain"
3. Enter your HostAfrica domain (e.g., `yourdomain.com`)
4. Follow verification instructions
5. Vercel will automatically provision SSL

**⏱️ DNS propagation takes 1-24 hours**

---

## Option 2: Static Site on HostAfrica cPanel

**Best for**: Using your existing HostAfrica hosting, but requires code changes

### ⚠️ Limitations
- No server-side rendering (SSR)
- No dynamic API routes
- Admin authentication needs external service
- Trip request submissions need external API

### Required Changes

#### 1. Switch to Static Adapter

Edit `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static', // Changed from 'server'
  integrations: [react(), tailwind()],
  devToolbar: {
    enabled: false
  }
});
```

#### 2. Pre-render All Pages

Update `src/pages/packages/[id].astro`:
```javascript
export const prerender = true; // Already set ✅
```

Remove dynamic admin routes or convert to client-side auth.

#### 3. Use Supabase Client-Side for Everything

Replace API routes with direct Supabase calls from React components.

#### 4. Build and Deploy

```bash
# Build static site
npm run build

# Output will be in ./dist folder
```

**Upload to HostAfrica:**
1. Login to cPanel
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain's root)
4. Upload all files from `./dist` folder
5. Ensure `.htaccess` is configured for SPA routing:

```apache
# .htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### ⚠️ Major Drawback
You'll lose:
- Server-side authentication
- Protected admin routes
- API endpoints
- Middleware protection

**Not recommended unless you refactor significantly.**

---

## Option 3: HostAfrica VPS/Cloud Hosting

**Best for**: Full control, keeping everything with HostAfrica

### Prerequisites
- HostAfrica VPS or Cloud hosting plan
- SSH access
- Root/sudo privileges

### Step-by-Step Deployment

#### 1. Connect to Your VPS

```bash
ssh root@your-vps-ip
```

#### 2. Install Node.js

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Verify installation
node --version
npm --version
```

#### 3. Install PM2 (Process Manager)

```bash
npm install -g pm2
```

#### 4. Clone Your Project

```bash
# Install git if needed
apt install -y git

# Clone your repository
cd /var/www
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Install dependencies
npm install

# Create .env file
nano .env
```

Add your environment variables:
```env
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
ADMIN_EMAIL=your_admin_email
```

#### 5. Build the Project

```bash
npm run build
```

#### 6. Start with PM2

```bash
# Start the app
pm2 start npm --name "trip-planner" -- run preview

# Or use the built-in server
pm2 start node --name "trip-planner" -- ./dist/server/entry.mjs

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

#### 7. Configure Nginx as Reverse Proxy

```bash
# Install Nginx
apt install -y nginx

# Create Nginx configuration
nano /etc/nginx/sites-available/yourdomain.com
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable the site
ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

#### 8. Install SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow prompts and choose redirect option
```

#### 9. Configure Firewall

```bash
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw enable
```

#### 10. Setup Automatic Deployments (Optional)

```bash
# Create deployment script
nano /var/www/YOUR_REPO/deploy.sh
```

```bash
#!/bin/bash
cd /var/www/YOUR_REPO
git pull origin main
npm install
npm run build
pm2 restart trip-planner
```

```bash
chmod +x /var/www/YOUR_REPO/deploy.sh
```

---

## Domain Configuration

### If Using Vercel/Netlify

**HostAfrica DNS Settings:**
```
A Record:
  Name: @
  Value: [Provider's IP - see their docs]

CNAME Record:
  Name: www
  Value: [Provider's CNAME - see their docs]
```

### If Using HostAfrica VPS

**Point Domain to VPS:**
1. Login to HostAfrica domain management
2. Update nameservers to your VPS IP or:
3. Add A record pointing to your VPS IP:

```
A Record:
  Name: @
  Value: YOUR_VPS_IP

A Record:
  Name: www
  Value: YOUR_VPS_IP
```

---

## 🎯 Recommendation

**For your use case, I recommend Option 1 (Vercel):**

### Why?
1. ✅ **Zero infrastructure management**
2. ✅ **Free SSL certificates**
3. ✅ **Automatic deployments** from Git
4. ✅ **Global CDN** for fast loading worldwide
5. ✅ **Perfect Astro SSR support** out of the box
6. ✅ **Free tier** is generous (100GB bandwidth/month)
7. ✅ **You keep your HostAfrica domain** - just point DNS
8. ✅ **Deploy in 5 minutes** vs hours of VPS setup

### Cost Comparison
- **Vercel Free Tier**: $0/month (sufficient for most projects)
- **HostAfrica VPS**: ~$10-50/month + setup time
- **Your HostAfrica domain**: Already paid ✅

---

## 📋 Quick Start Checklist

### Deploying to Vercel (Recommended)

- [ ] Push code to GitHub
- [ ] Sign up for Vercel account
- [ ] Import GitHub repository
- [ ] Add environment variables
- [ ] Deploy (automatic)
- [ ] Add custom domain in Vercel
- [ ] Update DNS in HostAfrica cPanel
- [ ] Wait for DNS propagation (1-24 hours)
- [ ] Test your live site!

### Need Help?
- Vercel Docs: https://vercel.com/docs
- Astro Deployment: https://docs.astro.build/en/guides/deploy/
- HostAfrica Support: Contact for DNS help

---

## 🔧 Troubleshooting

### Build Fails on Vercel
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Domain Not Working
- Wait 24 hours for DNS propagation
- Use `dig yourdomain.com` to check DNS
- Verify DNS records in HostAfrica cPanel

### Environment Variables Not Working
- Ensure they're added in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly

---

**Good luck with your deployment! 🚀**
