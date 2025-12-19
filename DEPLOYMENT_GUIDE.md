# 🚀 VERCEL DEPLOYMENT GUIDE
## Deploy R-Tech Computer Website to Production

**Target URL**: https://rtech-pontianak.vercel.app

---

## OPTION 1: Deploy via Vercel Dashboard (RECOMMENDED - Easiest)

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### Step 2: Import Project
1. From Vercel dashboard, click "Add New" → "Project"
2. Find "r-tech-pontianak-landing" in your repository list
3. Click "Import"

### Step 3: Configure Project
**Framework Preset**: Vite
**Root Directory**: ./
**Build Command**: `npm run build`
**Output Directory**: `dist`
**Install Command**: `npm install`

**Environment Variables**: (None required for basic deployment)

### Step 4: Deploy
1. Click "Deploy"
2. Wait 1-2 minutes for build to complete
3. Done! Site is live at: `https://r-tech-pontianak-landing-[random].vercel.app`

### Step 5: Customize Domain (Optional)
1. In project settings → "Domains"
2. Add custom domain: `rtech-pontianak.vercel.app`
3. Or connect your own domain: `rtechpontianak.com`

**Your website is now LIVE!** 🎉

---

## OPTION 2: Deploy via Vercel CLI (For Developers)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
Follow prompts to authenticate via GitHub.

### Step 3: Deploy from Project Directory
```bash
cd /home/ihzabaker/Projects/r-tech-pontianak-landing
vercel
```

**Answer prompts:**
- Set up and deploy? → Y
- Which scope? → [Your account]
- Link to existing project? → N (first time) or Y (subsequent deploys)
- What's your project's name? → r-tech-pontianak-landing
- In which directory is your code located? → ./
- Want to override settings? → N

### Step 4: Deploy to Production
```bash
vercel --prod
```

**Done!** Site is live at provided URL.

---

## OPTION 3: One-Click Deploy Button (Fastest)

Click this button to deploy instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ihza6661/r-tech-pontianak-landing)

1. Click button (will redirect to Vercel)
2. Choose your GitHub account
3. Name your project: `r-tech-pontianak-landing`
4. Click "Deploy"
5. Done in 2 minutes!

---

## POST-DEPLOYMENT CHECKLIST

After successful deployment:

### ✅ Test Website Functionality
- [ ] Open production URL
- [ ] Test on mobile device (Chrome mobile, Safari iOS)
- [ ] Click all WhatsApp buttons (should open WhatsApp with correct numbers)
- [ ] Test all navigation links
- [ ] Scroll through all sections
- [ ] Check images load properly
- [ ] Test FAQ accordion (expand/collapse)
- [ ] Check footer links work

### ✅ Performance Check
- [ ] Run Lighthouse audit (Chrome DevTools)
  - Target: 90+ Performance score
  - Target: 95+ Accessibility score
  - Target: 90+ Best Practices score
  - Target: 100 SEO score
- [ ] Test loading speed on slow 3G (Chrome DevTools Network throttling)
  - Target: < 5 seconds on slow 3G

### ✅ Configure Custom Domain (If Purchasing)

**Option A: Buy .com Domain**
1. Purchase from Namecheap, GoDaddy, or Niagahoster (~Rp 150-200k/year)
2. In Vercel project → Settings → Domains
3. Add domain: `rtechpontianak.com`
4. Follow DNS configuration instructions
5. Wait 24-48 hours for propagation

**Option B: Use Free Vercel Subdomain**
1. In Vercel project → Settings → Domains
2. Add: `rtech-pontianak.vercel.app`
3. Instant, no DNS configuration needed!

### ✅ Setup Analytics

**Google Analytics (Recommended):**
1. Create GA4 property at https://analytics.google.com
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```
4. Commit and push (Vercel auto-deploys)

**Or use Vercel Analytics (Easiest):**
1. In Vercel project → Analytics → Enable
2. Done! No code changes needed

### ✅ Enable HTTPS (Should be automatic)
- [ ] Verify URL starts with `https://`
- [ ] Check SSL certificate is valid (click padlock icon in browser)
- [ ] Vercel provides automatic SSL - should be green checkmark

### ✅ Setup Monitoring

**Vercel Built-in:**
- Deployment notifications (via email/Slack)
- Error tracking (automatic)
- Performance insights (Analytics tab)

**Optional - UptimeRobot (Free):**
1. Sign up at https://uptimerobot.com
2. Add monitor for your Vercel URL
3. Get alerted if site goes down (via email/SMS)

---

## CONTINUOUS DEPLOYMENT (Auto-Deploy on Git Push)

**Vercel automatically watches your GitHub repo!**

Whenever you push to `main` branch:
1. Vercel detects commit
2. Automatically builds and deploys
3. New version live in 1-2 minutes
4. No manual action needed!

**To Deploy Updates:**
```bash
# Make your changes locally
git add .
git commit -m "update: ..."
git push origin main

# Vercel automatically deploys!
# Check Vercel dashboard for deployment status
```

**Preview Deployments (Bonus):**
- Every git push creates a preview URL
- Safe to test changes before merging to production
- Preview URL: `https://r-tech-pontianak-landing-[commit-hash].vercel.app`

---

## UPDATING WEBSITE CONTENT

### Update Products (When New Stock Arrives)

**Method 1: Via Git (Developer)**
1. Edit `src/components/InventorySection.tsx`
2. Update products array:
```typescript
{
  name: "New Laptop Model",
  image: newLaptopImage, // Add image to src/assets first
  price: "Rp X.XXX.XXX",
  specs: { ... },
  available: true,
  soldDate: null,
}
```
3. Commit and push → Auto-deploys

**Method 2: Via WhatsApp (Client)**
Client sends you:
- Product photo
- Specs (processor, RAM, storage, display)
- Price
- Warranty info

You update and push → Done in 5-10 minutes

### Mark Product as Sold
Change in `InventorySection.tsx`:
```typescript
available: false,
soldDate: "2024-12-XX",
```

### Update Company Info
Edit `src/lib/constants.ts`:
```typescript
export const COMPANY_INFO = {
  name: "R-Tech Computer",
  phone: "082157000466", // Update if changes
  // ... other fields
};
```

---

## TROUBLESHOOTING

### Issue: Build Failed on Vercel

**Check build logs:**
1. Go to Vercel dashboard → Your project
2. Click failed deployment
3. View build logs

**Common causes:**
- Missing dependencies (run `npm install` locally to verify)
- TypeScript errors (run `npm run build` locally first)
- Environment variables missing

**Solution:**
```bash
# Test build locally first
npm run build

# If builds locally, push to GitHub
# Vercel should succeed
```

### Issue: Images Not Loading

**Cause:** Image paths incorrect

**Solution:**
- Images must be in `src/assets/`
- Import at top of component:
```typescript
import laptopImage from "@/assets/laptop-hp.jpg";
```
- Use imported variable in `<img src={laptopImage} />`

### Issue: WhatsApp Links Not Working

**Check:**
- Phone numbers in `src/lib/constants.ts` correct format (62xxx, no spaces)
- Links are `https://wa.me/62xxx?text=...`
- Test on mobile device (WhatsApp deeplink only works on mobile)

### Issue: Site Slow to Load

**Solutions:**
1. Optimize images:
```bash
# Convert to WebP (smaller size)
npm install -g sharp-cli
sharp -i laptop.jpg -o laptop.webp
```

2. Enable Vercel image optimization:
- Use Next.js `<Image>` component (requires migrating to Next.js)
- Or use Vercel's Edge Network (automatic with Pro plan)

3. Lazy load images:
```tsx
<img src={image} loading="lazy" alt="..." />
```

---

## PRICING: VERCEL HOSTING COSTS

### Free Tier (Hobby Plan)
**Perfect for R-Tech website!**

**Includes:**
- 100 GB bandwidth/month (plenty for landing page)
- Unlimited projects
- Automatic HTTPS
- Continuous deployment
- Preview deployments
- Vercel Analytics (basic)

**Limits:**
- 1 member per team
- 100 GB bandwidth (easily sufficient)
- Community support

**Cost:** Rp 0/month 🎉

### Pro Plan (If Needed Later)
**Only upgrade if:**
- Traffic exceeds 100 GB/month (very high traffic)
- Need team collaboration (multiple developers)
- Want advanced analytics

**Cost:** $20/month (~Rp 300k/month)

**Recommendation:** Start with FREE tier. Upgrade only if necessary (likely never for landing page).

---

## DOMAIN PRICING (Separate from Hosting)

### Option 1: Use Free Vercel Subdomain
**URL:** `rtech-pontianak.vercel.app`
**Cost:** FREE
**Pros:** Instant, professional enough
**Cons:** "vercel.app" in domain

### Option 2: Buy .com Domain
**URL:** `rtechpontianak.com`
**Cost:** Rp 150-200k/year
**Registrars:**
- Namecheap: ~$10/year (Rp 150k)
- GoDaddy: ~$15/year (Rp 220k)
- Niagahoster: ~Rp 150k/year (Indonesian)

**Pros:** Professional, brandable
**Cons:** Annual renewal cost

### Option 3: Buy .id Domain (Indonesian)
**URL:** `rtechpontianak.id` or `rtechpontianak.co.id`
**Cost:** Rp 200-300k/year
**Registrar:** Pandi.id, Niagahoster

**Pros:** Local identity, SEO boost in Indonesia
**Cons:** Slightly higher cost, registration process

**Recommendation for Client Pitch:**
- **Trial:** Use free `rtech-pontianak.vercel.app`
- **Post-Trial:** Upgrade to `rtechpontianak.com` (Rp 150k/year)

---

## MAINTENANCE COSTS SUMMARY

**Monthly Costs:**
- **Hosting (Vercel):** Rp 0 (free tier sufficient)
- **Domain (.com):** Rp 15k/month (Rp 180k/year ÷ 12)
- **SSL Certificate:** Rp 0 (included with Vercel)
- **Monitoring:** Rp 0 (UptimeRobot free tier)
- **Analytics:** Rp 0 (Google Analytics or Vercel Analytics free)

**Total Infrastructure:** Rp 15k/month (just domain!)

**Your Maintenance Fee:** Rp 200k/month
- Includes: content updates, support, optimization
- Client pays: Rp 215k/month total (infrastructure + your service)

**Super affordable!**

---

## FINAL CHECKLIST BEFORE PITCH

- [ ] Website deployed to Vercel
- [ ] Production URL tested and working
- [ ] All WhatsApp buttons tested (correct numbers)
- [ ] Mobile responsive verified (test on actual phone)
- [ ] Load time < 3 seconds (test on phone)
- [ ] Lighthouse score > 90 (run audit)
- [ ] Screenshot all sections for pitch deck
- [ ] Note URL to share with owner: __________________
- [ ] QR code generated for URL (use https://qr.io)
- [ ] Share URL with 2-3 friends for feedback (optional)

---

## DEPLOYMENT COMPLETE! 🎉

**Your website is now LIVE and ready for client pitch!**

**Next Steps:**
1. ✅ Test thoroughly (checklist above)
2. ✅ Create QR code for pitch deck
3. ✅ Practice pitch with live demo
4. ✅ Prepare pitch materials (deck, Q&A, contract)
5. ✅ Schedule meeting with owner next week

**Website URL:** https://rtech-pontianak.vercel.app
**GitHub Repo:** https://github.com/ihza6661/r-tech-pontianak-landing
**Vercel Dashboard:** https://vercel.com/dashboard

---

**Good luck with your pitch! You've got this! 💪**
