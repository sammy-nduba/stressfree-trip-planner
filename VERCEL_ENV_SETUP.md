# 🔐 Setting Up Environment Variables in Vercel

## The Issue
Your build is failing because Vercel doesn't have your Supabase credentials yet.

## Quick Fix (5 minutes)

### Step 1: Get Your Supabase Credentials

Open your `.env` file locally and copy these values:
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_EMAIL` (optional but recommended)

### Step 2: Add to Vercel Dashboard

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in the left sidebar
5. Add each variable:

```
Key: PUBLIC_SUPABASE_URL
Value: [paste your Supabase URL]
Environment: Production, Preview, Development (select all)
```

```
Key: PUBLIC_SUPABASE_ANON_KEY
Value: [paste your Supabase anon key]
Environment: Production, Preview, Development (select all)
```

```
Key: ADMIN_EMAIL
Value: [your admin email]
Environment: Production, Preview, Development (select all)
```

6. Click **"Save"** for each variable

### Step 3: Redeploy

After adding variables, you need to redeploy:

**Option A: Via Dashboard**
1. Go to "Deployments" tab
2. Click the three dots (...) on the latest deployment
3. Click "Redeploy"
4. Check "Use existing Build Cache" (optional)
5. Click "Redeploy"

**Option B: Via Git Push**
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

**Option C: Via Vercel CLI**
```bash
vercel --prod
```

---

## ✅ Verification

After redeployment:
1. Check build logs - should show "Build Completed"
2. Visit your Vercel URL (e.g., `your-project.vercel.app`)
3. Test the site - should load correctly

---

## 🔍 Troubleshooting

### Build Still Fails?

**Check variable names match exactly:**
- Must be `PUBLIC_SUPABASE_URL` (not `SUPABASE_URL`)
- Must be `PUBLIC_SUPABASE_ANON_KEY` (not `SUPABASE_ANON_KEY`)
- Case-sensitive!

**Check values are correct:**
- Supabase URL should look like: `https://xxxxx.supabase.co`
- Anon key should be a long string (JWT token)
- No quotes around values in Vercel

**Check environments selected:**
- Select all three: Production, Preview, Development

---

## 📋 Quick Reference

### Where to Find Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Open your project
3. Click "Settings" (gear icon)
4. Click "API" in the left sidebar
5. Copy:
   - **Project URL** → `PUBLIC_SUPABASE_URL`
   - **anon public** key → `PUBLIC_SUPABASE_ANON_KEY`

---

## 🎯 Expected Result

After adding environment variables and redeploying:
```
✅ Build completed successfully
✅ Deployment ready
✅ Site accessible at your-project.vercel.app
```

---

**Next Step:** After this works, proceed to DNS configuration to connect your HostAfrica domain.
