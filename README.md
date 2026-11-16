# TePC – Tanzania Website

Official website of **Tanganyika Epistemological Promotion (TePC – Tanzania)**.
Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Ready to deploy on Vercel.

---

## 1. About

**Tanganyika Epistemological Promotion (TePC – Tanzania)** is a non-governmental, non-profit organization
(founded 2022, registered 2026) based in Kasulu, Kigoma.

- **Tagline:** Empowering Communities Through Entrepreneurship, Skills & Sustainable Livelihoods
- **Vision:** Fostering healthier communities through entrepreneurship, skills development, and sustainable livelihoods in Tanzania.
- **Mission:** To empower youth, women, and marginalized communities through innovative training, enterprise support, and sustainable development initiatives that improve livelihoods and foster inclusive growth.
- **Reg. No.:** 00NGO/R/9866
- **Address:** P.O. Box 475, 47332, Kasulu, Kigoma – Tanzania
- **Phone:** +255 724 800 201 / +255 724 800 207
- **Email:** info@tepcc.org | info.tepctanzania@gmail.com
- **Website:** www.tepcc.org

## ⚠️ Before Going Live — Critical Checklist

- [ ] Replace ALL placeholder YouTube links in `data/announcements.ts` (currently `https://www.youtube.com/watch?v=dQw4w9WgXcQ` appears in multiple announcements — this is a placeholder Rick Roll video). Either: (a) replace with real TePC YouTube URLs, OR (b) delete the `videoUrl` line entirely from each announcement.
- [ ] Replace ALL placeholder Google Drive links in `data/announcements.ts` (currently `https://drive.google.com/file/d/1samplePDF/view`). Either: (a) replace with real PDFs shared as "Anyone with link can view", OR (b) delete the `pdfUrl` line entirely.
- [ ] Review all 10 announcements — dates range from Jan to Jun 2026. If any describe "upcoming" events that have already passed, either update their dates to 2027 or change the wording to past tense.
- [ ] Replace Unsplash image URLs with real TePC photos: Download photos to `/public/images/`, then change each `image:` field in `data/announcements.ts` from the Unsplash URL to `"/images/your-filename.jpg"`. Same for the `galleryImages` array.
- [ ] Set `NEXT_PUBLIC_WEB3FORMS_KEY` in Vercel → Settings → Environment Variables. Without it, the contact form on `/wasiliana` will fail silently. Get a free key at https://web3forms.com.
- [ ] In Vercel → Settings → Domains, add BOTH:
  - `tepcc.org`
  - `www.tepcc.org`
  Then copy the A record and CNAME into your domain registrar's DNS.
- [ ] Test the live site on a real phone (not just DevTools mobile view).

---

## 2. Requirements

- Node.js **18.17 or newer** (https://nodejs.org – choose the LTS version)
- npm (comes with Node.js)
- VS Code (recommended editor) – https://code.visualstudio.com
- A free GitHub account and a free Vercel account

---

## 3. Running Locally

1. Unzip the project and open the `tepc-website` folder in VS Code.
2. Open the terminal in VS Code (`Terminal` → `New Terminal`).
3. Install dependencies:
   ```bash
   npm install
   ```
4. (Optional) Create the environment file so the contact form works locally – see section 6.
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open http://localhost:3000 in your browser.

To test the production build:

```bash
npm run build
npm start
```

---

## 4. Adding a New Announcement

All announcements live in **one file**: `data/announcements.ts`.

1. Open `data/announcements.ts`.
2. Find the `announcements` array.
3. Copy the template block below and paste it **inside the array** (before the closing `];`), with a comma after the previous block.
4. Change the values, save the file, and refresh the browser. Done.

### Template (fully filled example)

```ts
  {
    slug: 'tailoring-training-kasulu-2026',
    title: 'Free Tailoring Training for Women and Youth – Kasulu',
    category: 'Mafunzo',
    date: '2026-07-10',
    excerpt:
      'TePC invites women and youth in Kasulu to a practical tailoring course that leads to immediate income.',
    content: `<p>TePC – Tanzania is organizing a <strong>practical tailoring training</strong> in Kasulu.</p>
<h3>What You Will Learn</h3>
<ul>
<li>Basic cutting and sewing</li>
<li>Pricing and selling your products</li>
</ul>
<p>For more information, email <strong>info@tepcc.org</strong> or call <strong>+255 724 800 201</strong>.</p>`,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID', // optional
    pdfUrl: 'https://drive.google.com/file/d/YOUR_FILE_ID/view', // optional
    author: 'TePC Programs Team', // optional
    featured: false, // optional – true shows it in the home page hero
  },
```

### Field rules

| Field | Rule |
|-------|------|
| `slug` | Lowercase letters, numbers and dashes only. **No spaces.** Must be unique. It becomes the web address: `/matangazo/your-slug` |
| `title` | The headline of the announcement |
| `date` | Format `YYYY-MM-DD` (example: `2026-07-10`) |
| `category` | Must be exactly one of: `Matangazo`, `Mafunzo`, `Mikopo`, `Matukio`, `Fursa` |
| `excerpt` | Short summary (1–2 sentences) shown on cards |
| `content` | HTML using `<p>`, `<h3>`, `<ul>`, `<li>`, `<strong>` |
| `image` | Unsplash URL **or** `/images/your-file.jpg` (see section 5) |
| `videoUrl` | Optional. Any normal YouTube link |
| `pdfUrl` | Optional. A Google Drive link (set sharing to "Anyone with the link") |
| `featured` | Optional. The most recent `featured: true` item appears in the home page hero |

Tip: announcements with `category: 'Matukio'` automatically appear on the **/matukio** page, `'Fursa'` on **/fursa**, and any announcement with a `pdfUrl` appears on **/pakua**.

---

## 5. Replacing Images

1. Download your image (JPG or PNG).
2. Create the folder `public/images/` if it does not exist and put the image inside, for example `public/images/training.jpg`.
3. In `data/announcements.ts`, set the `image` field to `"/images/training.jpg"`.
4. Save and refresh.

Unsplash links (`images.unsplash.com`) keep working without any download.
To use images from another website, add its hostname to `images.remotePatterns` in `next.config.js`.

---

## 6. Web3Forms API Key (Contact Form)

The contact form at `/wasiliana` sends messages to your email through Web3Forms (free).

1. Go to **https://web3forms.com**.
2. Enter your email address (for example `info@tepcc.org`) and get your free **Access Key**.
3. In the project folder, create a file named `.env.local` and add:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here
   ```
   (replace `your_key_here` with your real key).
4. Restart `npm run dev`.
5. Add the **same variable** in Vercel (see section 8) so the form works on the live site.

---

## 7. Push to GitHub

1. Create a new empty repository on https://github.com/new named `tepc-website` (do not add README or .gitignore).
2. In the project terminal run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/tepc-website.git
   git push -u origin main
   ```
   Replace `USERNAME` with your GitHub username.

Every time you edit content later:

```bash
git add .
git commit -m "Add new announcement"
git push
```

Vercel will rebuild and update the website automatically.

---

## 8. Deploy to Vercel

1. Log in to https://vercel.com (you can sign in with GitHub).
2. Click **Add New → Project** and import the `tepc-website` repository.
3. Framework is detected automatically as **Next.js**.
4. Open **Environment Variables** and add:
   - Name: `NEXT_PUBLIC_WEB3FORMS_KEY`
   - Value: your Web3Forms key
5. Click **Deploy**. After about 1–2 minutes your site is live on a `*.vercel.app` address.

If you add or change the environment variable later, go to **Deployments → Redeploy**.

---

## 9. Custom Domain (tepcc.org)

1. In Vercel open your project → **Settings → Domains**.
2. Add `tepcc.org` and `www.tepcc.org`.
3. At your domain registrar (where you bought tepcc.org), open the DNS settings and add:

   | Type | Name / Host | Value |
   |------|-------------|-------|
   | A | `@` | `76.76.21.21` |
   | CNAME | `www` | `cname.vercel-dns.com` |

4. Wait for DNS propagation (5 minutes – 24 hours). Vercel shows a green check when ready.
5. SSL (HTTPS) is automatic and free.

Tip: set `www.tepcc.org` as the primary domain, and let `tepcc.org` redirect to it (Vercel offers this in the Domains screen). The sitemap and SEO settings already use `https://www.tepcc.org`.

---

## 10. Folder Structure

```
tepc-website/
├── app/                 Pages (Next.js App Router)
│   ├── layout.tsx       Root layout: navbar, footer, SEO defaults
│   ├── page.tsx         Home page
│   ├── globals.css      Global styles
│   ├── not-found.tsx    404 page
│   ├── sitemap.ts       Automatic sitemap.xml
│   ├── robots.ts        Automatic robots.txt
│   ├── matangazo/       Announcements list + [slug] detail pages
│   ├── matukio/         Events
│   ├── fursa/           Opportunities
│   ├── pakua/           PDF downloads
│   ├── kuhusu/          About page
│   └── wasiliana/       Contact page
├── components/          Reusable UI pieces (Navbar, Footer, cards, forms, icons...)
├── data/announcements.ts  ALL announcements, videos and gallery images (edit this!)
├── lib/utils.ts         Shared constants (contact details, menu) and helpers
├── public/logo.svg      Logo / favicon
├── next.config.js       Next.js config (allowed image hosts)
├── tailwind.config.ts   Tailwind config (brand colors)
├── postcss.config.js    PostCSS config
├── tsconfig.json        TypeScript config
├── vercel.json          Vercel config
├── package.json         Dependencies and scripts
├── .env.example         Example environment variables
└── .gitignore           Files Git should ignore
```

To change the videos on the home page or the gallery photos, edit the `videos` and `galleryImages` arrays at the bottom of `data/announcements.ts`.
Replace the placeholder YouTube ID `dQw4w9WgXcQ` and the placeholder PDF link `1samplePDF` with your real ones.

---

## 11. Contact

**Tanganyika Epistemological Promotion (TePC – Tanzania)**
Reg. No.: 00NGO/R/9866
P.O. Box 475, 47332, Kasulu, Kigoma – Tanzania
Phone: +255 724 800 201 / +255 724 800 207
Email: info@tepcc.org | info.tepctanzania@gmail.com
Website: www.tepcc.org
