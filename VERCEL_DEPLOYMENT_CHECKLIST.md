# ✅ Vercel Deployment Checklist

## Current Status: Environment Variables Missing

Follow this checklist to fix your Vercel deployment error.

---

## 📋 Step-by-Step Checklist

### Phase 1: Gather Credentials (2 minutes)

- [ ] **Open your local `.env` file** OR go to Supabase dashboard
- [ ] **Copy `PUBLIC_SUPABASE_URL`**
  - From `.env` OR Supabase → Settings → API → Project URL
- [ ] **Copy `PUBLIC_SUPABASE_ANON_KEY`**
  - From `.env` OR Supabase → Settings → API → anon public key
- [ ] **Have your admin email ready**

---

### Phase 2: Add to Vercel (3 minutes)

- [ ] **Go to** [vercel.com/dashboard](https://vercel.com/dashboard)
- [ ] **Click** on your project name
- [ ] **Click** "Settings" tab
- [ ] **Click** "Environment Variables" in left sidebar

#### Add Variable 1:
- [ ] **Click** "Add New" button
- [ ] **Name:** `PUBLIC_SUPABASE_URL`
- [ ] **Value:** [paste your Supabase URL]
- [ ] **Environments:** Check ✓ Production ✓ Preview ✓ Development
- [ ] **Click** "Save"

#### Add Variable 2:
- [ ] **Click** "Add New" button
- [ ] **Name:** `PUBLIC_SUPABASE_ANON_KEY`
- [ ] **Value:** [paste your Supabase anon key]
- [ ] **Environments:** Check ✓ Production ✓ Preview ✓ Development
- [ ] **Click** "Save"

#### Add Variable 3 (Optional but recommended):
- [ ] **Click** "Add New" button
- [ ] **Name:** `ADMIN_EMAIL`
- [ ] **Value:** [your admin email]
- [ ] **Environments:** Check ✓ Production ✓ Preview ✓ Development
- [ ] **Click** "Save"

---

### Phase 3: Redeploy (1 minute)

Choose ONE method:

#### Method A: Via Vercel Dashboard (Easiest)
- [ ] **Click** "Deployments" tab
- [ ] **Find** the latest deployment
- [ ] **Click** the three dots (⋯) on the right
- [ ] **Click** "Redeploy"
- [ ] **Click** "Redeploy" to confirm

#### Method B: Via Git Push
- [ ] Open terminal in your project
- [ ] Run: `git commit --allow-empty -m "Trigger redeploy"`
- [ ] Run: `git push`

#### Method C: Via Vercel CLI
- [ ] Open terminal in your project
- [ ] Run: `vercel --prod`

---

### Phase 4: Verify (2 minutes)

- [ ] **Wait** for build to complete (1-2 minutes)
- [ ] **Check** build logs show "Build Completed" ✅
- [ ] **Check** deployment status shows "Ready" ✅
- [ ] **Visit** your Vercel URL (e.g., `your-project.vercel.app`)
- [ ] **Verify** site loads correctly
- [ ] **Test** a few pages (home, destinations, packages)

---

## ✅ Success Criteria

Your deployment is successful when you see:

- ✅ Build logs show "Build Completed"
- ✅ No error messages about environment variables
- ✅ Deployment status: "Ready"
- ✅ Site accessible at `your-project.vercel.app`
- ✅ Pages load without errors
- ✅ No console errors in browser

---

## 🚨 Troubleshooting

If build still fails, check:

### Variable Names
- [ ] Names are EXACTLY: `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`
- [ ] Names are case-sensitive (all caps for PUBLIC)
- [ ] Names include the `PUBLIC_` prefix

### Variable Values
- [ ] Supabase URL looks like: `https://xxxxx.supabase.co`
- [ ] Anon key is a long JWT token string
- [ ] No quotes around values in Vercel
- [ ] No extra spaces before/after values

### Environments
- [ ] All three boxes checked: Production, Preview, Development
- [ ] Variables saved (green checkmark appears)

### Redeployment
- [ ] Actually triggered a redeploy after adding variables
- [ ] Waited for new build to complete
- [ ] Checked the NEW deployment, not the old one

---

## 📖 Need More Help?

- **Quick Reference:** See `VERCEL_ERROR_FIX.txt`
- **Detailed Guide:** See `VERCEL_ENV_SETUP.md`
- **Vercel Docs:** https://vercel.com/docs/concepts/projects/environment-variables

---

## 🎯 After This Works

Once your Vercel deployment succeeds:

1. ✅ Mark this checklist complete
2. 📖 Read `DNS_CONFIGURATION.md`
3. 🌐 Connect your HostAfrica domain
4. ⏱️ Wait for DNS propagation (1-24 hours)
5. 🎉 Your site will be live!

---

**Current Step:** Add environment variables in Vercel dashboard

**Estimated Time:** 5 minutes

**You've got this! 🚀**
