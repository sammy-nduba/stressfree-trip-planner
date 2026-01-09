# 🌐 DNS Configuration Guide for HostAfrica

## Connecting Your HostAfrica Domain to Vercel

This guide shows you exactly how to configure DNS in HostAfrica cPanel to point your domain to Vercel.

---

## 📋 Prerequisites

- ✅ Your domain registered with HostAfrica
- ✅ Project deployed to Vercel
- ✅ Vercel project URL (e.g., `your-project.vercel.app`)

---

## 🔧 Step-by-Step DNS Configuration

### Step 1: Login to HostAfrica cPanel

1. Go to your HostAfrica client area
2. Find your hosting package
3. Click "Login to cPanel"

### Step 2: Access DNS Zone Editor

**Option A: Simple DNS Zone Editor**
1. In cPanel, scroll to "Domains" section
2. Click "Zone Editor"

**Option B: Advanced DNS Zone Editor**
1. In cPanel, scroll to "Domains" section
2. Click "Advanced DNS Zone Editor"

### Step 3: Configure DNS Records

You need to add/modify these records:

#### For Root Domain (yourdomain.com)

**Delete existing A record** (if any):
- Find the A record with Name: `@` or `yourdomain.com`
- Click "Delete" or "Remove"

**Add new A record:**
```
Type: A
Name: @ (or leave blank, or yourdomain.com)
Address/Value: 76.76.21.21
TTL: 14400 (4 hours)
```

#### For WWW Subdomain (www.yourdomain.com)

**Delete existing CNAME record** (if any):
- Find CNAME with Name: `www`
- Click "Delete" or "Remove"

**Add new CNAME record:**
```
Type: CNAME
Name: www
CNAME/Value: cname.vercel-dns.com.
TTL: 14400 (4 hours)
```

⚠️ **Important:** Note the trailing dot (`.`) in `cname.vercel-dns.com.` - some systems require it.

### Step 4: Save Changes

1. Click "Add Record" or "Save" for each record
2. Wait for confirmation message

---

## 🎯 Vercel Domain Configuration

### Step 1: Add Domain in Vercel

1. Login to [vercel.com](https://vercel.com)
2. Go to your project
3. Click "Settings" → "Domains"
4. Click "Add Domain"
5. Enter your domain: `yourdomain.com`
6. Click "Add"

### Step 2: Add WWW Variant

1. Click "Add Domain" again
2. Enter: `www.yourdomain.com`
3. Click "Add"
4. Choose to redirect www → non-www (or vice versa)

### Step 3: Verify DNS

Vercel will automatically check your DNS configuration:
- ✅ Green checkmark = DNS configured correctly
- ⚠️ Yellow warning = DNS propagating (wait)
- ❌ Red X = DNS misconfigured (check records)

---

## ⏱️ DNS Propagation Timeline

| Time | Status |
|------|--------|
| 0-5 minutes | DNS records saved in HostAfrica |
| 5-30 minutes | Some regions can access your site |
| 1-4 hours | Most regions can access your site |
| 4-24 hours | All regions can access your site |
| 24-48 hours | Fully propagated worldwide |

**Tip:** Use [whatsmydns.net](https://www.whatsmydns.net) to check propagation status.

---

## 🔍 Verification Steps

### Check DNS Records

**Using Command Line:**
```bash
# Check A record
dig yourdomain.com A

# Check CNAME record
dig www.yourdomain.com CNAME

# Check from specific DNS server
dig @8.8.8.8 yourdomain.com
```

**Expected Output:**
```
yourdomain.com.     14400   IN  A       76.76.21.21
www.yourdomain.com. 14400   IN  CNAME   cname.vercel-dns.com.
```

### Check in Browser

1. Open incognito/private window
2. Visit `http://yourdomain.com`
3. Should redirect to `https://yourdomain.com` (SSL)
4. Should show your Vercel-deployed site

---

## 🚨 Troubleshooting

### Issue: "Domain not found" in Vercel

**Solution:**
- Wait 1-2 hours for DNS propagation
- Verify DNS records in cPanel are correct
- Check for typos in domain name

### Issue: "Invalid Configuration" in Vercel

**Solution:**
- Ensure A record points to `76.76.21.21`
- Ensure CNAME points to `cname.vercel-dns.com`
- Remove any conflicting DNS records

### Issue: Site shows "404 Not Found"

**Solution:**
- Verify domain is added in Vercel dashboard
- Check that project is deployed successfully
- Ensure environment variables are set

### Issue: "SSL Certificate Error"

**Solution:**
- Wait 24 hours for Vercel to provision SSL
- Ensure DNS is fully propagated
- Check that both root and www domains are added

### Issue: Old HostAfrica site still showing

**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private mode
- Wait for DNS propagation (up to 48 hours)
- Flush DNS cache:
  ```bash
  # Windows
  ipconfig /flushdns
  
  # Mac
  sudo dscacheutil -flushcache
  
  # Linux
  sudo systemd-resolve --flush-caches
  ```

---

## 📧 Email Configuration (Important!)

⚠️ **Warning:** Changing DNS records may affect email delivery.

### If you use HostAfrica email:

**Keep these MX records** (don't delete):
```
Type: MX
Priority: 0
Value: mail.yourdomain.com
```

**Or add HostAfrica MX records:**
```
Type: MX
Priority: 0
Value: mail.hostafrica.com
```

Check with HostAfrica support for exact MX record values.

---

## 🎯 Quick Reference

### DNS Records Summary

| Record Type | Name | Value | Purpose |
|-------------|------|-------|---------|
| A | @ | 76.76.21.21 | Points root domain to Vercel |
| CNAME | www | cname.vercel-dns.com | Points www to Vercel |
| MX | @ | mail.yourdomain.com | Email (keep existing) |

### Important Links

- **HostAfrica cPanel:** https://cpanel.yourdomain.com
- **Vercel Dashboard:** https://vercel.com/dashboard
- **DNS Checker:** https://www.whatsmydns.net
- **SSL Checker:** https://www.ssllabs.com/ssltest/

---

## 📞 Support Contacts

### HostAfrica Support
- **Email:** support@hostafrica.com
- **Phone:** Check your client area
- **For:** DNS configuration help, MX records

### Vercel Support
- **Docs:** https://vercel.com/docs/concepts/projects/domains
- **Discord:** https://vercel.com/discord
- **For:** Domain verification, SSL issues

---

## ✅ Configuration Checklist

- [ ] Logged into HostAfrica cPanel
- [ ] Accessed Zone Editor
- [ ] Deleted old A record for root domain
- [ ] Added new A record pointing to 76.76.21.21
- [ ] Deleted old CNAME for www
- [ ] Added new CNAME pointing to cname.vercel-dns.com
- [ ] Saved all DNS changes
- [ ] Added domain in Vercel dashboard
- [ ] Added www variant in Vercel
- [ ] Verified DNS with dig/whatsmydns
- [ ] Waited for propagation (1-24 hours)
- [ ] Tested site in browser
- [ ] Confirmed SSL certificate is active
- [ ] Verified email still works (if applicable)

---

**DNS configuration complete! Your HostAfrica domain now points to Vercel. 🎉**

*Note: Full propagation may take up to 48 hours. Be patient!*
