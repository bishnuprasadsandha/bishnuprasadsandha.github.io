# Pending Tasks — Do It Yourself

These are all the remaining steps that require your action.
Do them in order — Step 1 first, then deploy (Step 2), then the rest.

---

## 1. Fix the AI Chat (Gemini API Quota Issue)

The AI chat widget is built and working in code, but the Gemini free tier quota is 0. Choose **one** option:

### Option A — Enable Billing on Google Cloud (Recommended, ~₹1–2/month)
1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Select project **"Default Gemini Project"** (gen-lang-client-0408575164)
3. Left menu → **Billing** → **Link a billing account** → add card
4. Once billing is linked, the existing API key (`AIzaSyBANHYOv3BhoN9R_...`) will work
5. Model in `js/ai-chat.js` is `gemini-2.0-flash-lite` — works after billing is enabled

### Option B — Switch to Groq (100% Free)
1. Go to [https://console.groq.com](https://console.groq.com) → create free account
2. **API Keys** → **Create API Key** → copy it
3. Tell Claude Code: *"Switch the AI chat from Gemini to Groq using this key: YOUR_KEY"*

---

## 2. Deploy to GitHub Pages (Make Site Live)

**Step-by-step:**
1. Go to [https://github.com](https://github.com) → sign in
2. Click **New repository**
3. Name it exactly: `bishnuprasadsandha.github.io`
4. Set to **Public** → click **Create repository**
5. Upload all files from your `Protfolio` folder to the repo (drag & drop on GitHub)
6. Go to repo **Settings** → **Pages** → Source: **Deploy from branch** → **main** → **/ (root)** → **Save**
7. Wait 2–3 minutes → your site is live at: **https://bishnuprasadsandha.github.io**

> **Note:** Make sure you upload ALL files including `css/`, `js/`, `images/`, `robots.txt`, `sitemap.xml`

---

## 3. Restrict Your Gemini API Key (Security — Do After Deploying)

Without this, anyone who views your page source can steal your API key and use your quota.

1. Go to [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
2. Click **"Gemini API Key"**
3. Under **"Application restrictions"** → select **HTTP referrers (websites)**
4. Add these entries:
   - `bishnuprasadsandha.github.io/*`
   - `localhost/*` (for local testing)
5. Click **Save**

---

## 4. Submit Sitemap to Google Search Console (After Deploying)

This tells Google to index your portfolio so you show up in search results.

1. Go to [https://search.google.com/search-console](https://search.google.com/search-console)
2. Click **Add property** → enter `https://bishnuprasadsandha.github.io`
3. Verify ownership (Google will guide you — easiest method is HTML file upload)
4. Left menu → **Sitemaps** → enter `sitemap.xml` → click **Submit**
5. Google will start indexing within 1–3 days

---

## 5. Add Google Analytics (After Deploying)

Track how many recruiters visit your portfolio.

1. Go to [https://analytics.google.com](https://analytics.google.com)
2. **Start measuring** → create account **"Bishnu Portfolio"**
3. Create a **Property** → **Web** → enter `https://bishnuprasadsandha.github.io`
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)
5. Tell Claude Code: *"Add Google Analytics G-XXXXXXXXXX to my portfolio"* — done in 30 seconds

---

## 6. Update API Key Domain Restriction After Custom Domain (Optional Future Step)

If you later buy a custom domain like `bishnuprasadsandha.dev`:
1. Go back to Google Cloud Console → Credentials → Gemini API Key
2. Add `bishnuprasadsandha.dev/*` and `www.bishnuprasadsandha.dev/*` to HTTP referrers
3. Update `sitemap.xml` and `robots.txt` with the new domain
4. Tell Claude Code to update the canonical URL in `index.html`

---

## 7. Update Play Store Links (When App URLs Change)

These 3 project cards have Play Store buttons — update if links change:

| App | File to Edit |
|-----|-------------|
| CashBook | `index.html` + `js/custom.js` (caseStudies object) |
| WeighBridgeMax | `index.html` + `js/custom.js` |
| Cineworld Android | `index.html` + `js/custom.js` |

---

## 8. Keep the AI System Prompt Updated

When your career grows, update `SYSTEM_PROMPT` in `js/ai-chat.js` (lines 12–57):
- New projects or apps shipped
- Job title / company changes
- YouTube subscriber count
- New skills added

---

## 9. Set Up EmailJS (Contact Form → Email on Desktop)

Free — 200 emails/month, no credit card needed.

**Steps:**
1. Go to [https://emailjs.com](https://emailjs.com) → **Sign up free** with your Gmail
2. Left menu → **Email Services** → **Add New Service** → choose **Gmail** → connect `asishkumar95889@gmail.com` → copy the **Service ID** (`service_xxxxxxx`)
3. Left menu → **Email Templates** → **Create New Template** → set it up:
   ```
   Subject: New message from {{from_name}} — Portfolio
   
   Name: {{from_name}}
   Email: {{from_email}}
   
   Message:
   {{message}}
   ```
   → **Save** → copy the **Template ID** (`template_xxxxxxx`)
4. Top right → **Account** → copy your **Public Key**
5. Open `js/custom.js` → find lines near the top of the contact form section:
   ```javascript
   var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';
   var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';
   ```
6. Replace each placeholder with your actual values and save

**Result:** Desktop visitors → email arrives in your Gmail. Mobile visitors → WhatsApp opens with pre-filled message.

---

## Summary Checklist

### Do First (Before Sharing Portfolio Link)
- [ ] Fix AI Chat — enable Gemini billing OR switch to Groq **(Step 1)**
- [ ] Set up EmailJS for contact form **(Step 9)**
- [ ] Deploy to GitHub Pages **(Step 2)**
- [ ] Restrict Gemini API key to `bishnuprasadsandha.github.io` **(Step 3)**

### Do After Deploying
- [ ] Submit sitemap to Google Search Console **(Step 4)**
- [ ] Add Google Analytics **(Step 5)**

### Ongoing
- [ ] Update Play Store links if they change **(Step 7)**
- [ ] Keep AI system prompt updated as career grows **(Step 8)**
