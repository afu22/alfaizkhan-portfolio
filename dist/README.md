# Alfaizkhan — Personal Developer Portfolio & CMS

> **B.Tech Computer Science Engineering Student | Aspiring AI/ML Engineer**  
> Silver Oak University · Gujarat, India  
> Live Website: [https://alfaizkhan.github.io](https://alfaizkhan.github.io)

A modern, responsive, high-performance developer portfolio and private content management system built with **React 18**, **Vite**, **Tailwind CSS**, and **Lucide Icons**.

Designed around a **dynamic project data system** and a **private authenticated admin suite**, allowing seamless project additions, live card previews, profile customization, and privacy controls without touching HTML or breaking routing.

---

## 🌟 Key Features

* **⚡ Dynamic Project System**: Projects are rendered dynamically from a single source of truth (`data/projects.json` & `data/projects.js`). Adding a project automatically generates cards, search indexes, category filters, and full detail pages (`/projects/:slug`).
* **🔐 Private Admin Suite (`/admin`)**: A password-protected management command center accessible only by Alfaizkhan:
  * **Interactive Project Creator**: Add/edit projects with live card previews and 1-click feature toggles.
  * **Profile & Bio Editor**: Update academic titles, university details, location, and social links.
  * **Privacy & Permission Controls**: Master toggle switches to hide/show email, phone, resume, GitHub, and LinkedIn to outside visitors.
  * **Passcode Security**: Customizable admin passcode with secure authentication.
* **🛡️ Zero Broken Image & Crash Guarantee**: Reusable SVG vector placeholders automatically replace missing images. Empty links hide gracefully.
* **🔍 Instant Search & Category Filters**: Real-time multi-field search across titles, descriptions, and technology tags.
* **🎨 Modern Developer Dark Aesthetic**: Glassmorphism, subtle grid ambient glows, typography pairing (`Plus Jakarta Sans` & `Fira Code`).
* **📱 100% Responsive & Cross-Device**: Optimized layout for desktop, tablets, and mobile devices with smooth animations and touch navigation.
* **🚀 GitHub Pages SPA Ready**: Includes custom `404.html` client-side redirect routing so refreshing sub-routes like `/projects/feesense` or `/admin` never returns a 404 error.

---

## 🛠️ Tech Stack

* **Frontend**: React 18, React Router v6, Tailwind CSS, Lucide React Icons
* **Build Tooling**: Vite 6, PostCSS, Autoprefixer
* **Persistence & State**: React Context API, Dual LocalStorage & Server REST API sync
* **Deployment**: GitHub Pages (Automated via GitHub Actions), Vercel, Netlify

---

## 📁 Repository Structure

```
├── .github/workflows/deploy.yml   # GitHub Actions automatic deployment workflow
├── data/
│   ├── projects.js                # Single source of truth (ES Module)
│   └── projects.json              # Synchronized persistent database
├── config/
│   ├── site.js                    # Global site & profile configuration
│   ├── site-config.json           # Live updated profile data
│   └── privacy.json               # Live updated privacy permissions
├── public/
│   ├── 404.html                   # GitHub Pages SPA client-side routing fallback
│   ├── _redirects                 # Netlify SPA routing rules
│   ├── vercel.json                # Vercel SPA rewrite configuration
│   └── images/                    # Project thumbnails and fallbacks
├── src/
│   ├── components/                # Modular UI components (Navbar, Footer, Hero, Admin, etc.)
│   ├── context/DataContext.jsx    # Real-time state & persistence engine
│   ├── pages/                     # Routed views (Home, About, Projects, Detail, Admin)
│   └── styles/                    # Global Tailwind styling & glass utilities
├── START_PORTFOLIO.bat            # 1-Click offline local server launcher
├── server.js                      # Local development server with REST APIs
└── vite.config.js                 # Vite build & alias configuration
```

---

## 🚀 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Or launch via local production server:
   ```bash
   npm start
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 👤 Author

* **Alfaizkhan**
* Education: B.Tech Computer Science Engineering, Silver Oak University
* Previous Education: Diploma in Computer Engineering
* Focus: Aspiring AI/ML Engineer
* Location: Gujarat, India
