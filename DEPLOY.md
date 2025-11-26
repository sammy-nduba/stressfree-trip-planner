# 🚀 Deployment Guide for HostAfrica

This guide will help you deploy your **Stress-Free Trip Planner** application to HostAfrica. Since your app uses Server-Side Rendering (SSR) for the admin panel and API routes, you need a hosting plan that supports **Node.js**.

Most HostAfrica plans come with **cPanel**, which includes a "Setup Node.js App" feature.

---

## 📋 Prerequisites

1.  **HostAfrica Hosting Plan**: Ensure your plan supports Node.js (Standard Web Hosting usually does, or a VPS).
2.  **Domain**: Your secured domain (e.g., `yourdomain.com`).
3.  **Supabase Project**: Your existing Supabase project (database & auth).

---

## 🛠️ Step 1: Prepare Your Application

1.  **Build the project locally**:
    Run this command in your terminal to create the production build:
    ```bash
    npm run build
    ```
    This creates a `dist/` folder containing your server code.

2.  **Create a `server.js` entry point**:
    Create a new file named `server.js` in your project root (if it doesn't exist) with this content. This helps cPanel run your app:
    ```javascript
    import { handler } from './dist/server/entry.mjs';
    import express from 'express';

    const app = express();
    const port = process.env.PORT || 3000;

    app.use(express.static('dist/client'));
    app.use((req, res, next) => {
      handler(req, res, next);
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    ```
    *Note: You may need to install express: `npm install express`*

3.  **Zip your files**:
    Select and zip the following files/folders:
    - `dist/` (folder)
    - `package.json`
    - `server.js` (if created above, or just use `dist/server/entry.mjs` directly if cPanel allows)
    - `.env` (optional, better to set env vars in cPanel)

---

## ☁️ Step 2: Upload to HostAfrica (cPanel)

1.  **Log in to cPanel**.
2.  **File Manager**:
    - Navigate to your domain's root folder (usually `public_html` or a subfolder).
    - **Upload** your zip file.
    - **Extract** the zip file.

---

## ⚙️ Step 3: Configure Node.js in cPanel

1.  **Find "Setup Node.js App"**:
    - In cPanel dashboard, look for "Software" section -> "Setup Node.js App".
2.  **Create Application**:
    - Click **"Create Application"**.
    - **Node.js Version**: Select the latest available (e.g., 18.x or 20.x).
    - **Application Mode**: `Production`.
    - **Application Root**: The path to where you uploaded files (e.g., `public_html`).
    - **Application URL**: Select your domain.
    - **Application Startup File**: `dist/server/entry.mjs` (or `server.js` if you created one).
3.  **Environment Variables**:
    - Click "Add Variable".
    - Add `PUBLIC_SUPABASE_URL` = `your_supabase_url`
    - Add `PUBLIC_SUPABASE_ANON_KEY` = `your_anon_key`
    - Add `NODE_OPTIONS` = `--dns-result-order=ipv4first` (Critical for Supabase connection!)
4.  **Install Dependencies**:
    - Click **"Run NPM Install"**. This will install dependencies from your `package.json`.
5.  **Start App**:
    - Click **"Start App"**.

---

## 🔍 Step 4: Verify

Visit your domain. You should see your application running!

### 🚑 Troubleshooting

-   **500 Error?** Check the "Log" file in the Node.js app settings in cPanel.
-   **Database Error?** Ensure you added the `NODE_OPTIONS` environment variable as described above.
-   **Assets 404?** Ensure your `server.js` (if used) is correctly serving the `dist/client` folder as static files.

---

## 💡 VPS Option (Advanced)

If you have a VPS (Virtual Private Server):
1.  SSH into your server.
2.  Install Node.js & PM2 (`npm install -g pm2`).
3.  Upload your files.
4.  Run `npm install --production`.
5.  Start with PM2: `NODE_OPTIONS='--dns-result-order=ipv4first' pm2 start dist/server/entry.mjs --name "trip-planner"`.
6.  Setup Nginx as a reverse proxy to port 4321 (or 3000).
