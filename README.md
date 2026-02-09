# Fairway Electrical Website

A modern, responsive, static one-page website for Fairway Electrical.

## 🔧 Technology Stack
*   **HTML5**: Semantic markup for structure.
*   **CSS3**: Custom properties (variables), Flexbox, and Grid for styling. No frameworks.
*   **JavaScript**: Vanilla JS for mobile menu and scroll effects.
*   **Decap CMS**: Pre-configured for Netlify deployment.

## 🚀 How to Run locally
1.  Open `index.html` in your browser from the project root.
2.  Or use a simple static server (e.g., `python -m http.server 8000` in the project root, then visit `http://localhost:8000`).

## 📝 Decap CMS (Content Manager)
The site uses **Decap CMS** so you can edit Services, Portfolio, and Testimonials from a web UI.

- **On Netlify**: Go to `https://yoursite.com/admin/`. Log in with Netlify Identity (enable it in Netlify: Identity → Enable, and enable Git Gateway under Identity → Services). The CMS will commit changes to your repo.
- **Locally**: Run a local backend so the CMS can read/write without Netlify:
  1. In a terminal, run: `npx decap-server`
  2. In `admin/config.yml`, uncomment the line: `local_backend: true`
  3. Serve the site (e.g. `python -m http.server 8000`) and open `http://localhost:8000/admin/`

Content is stored as Markdown in:
- `content/services/` — Services (title, description, icon)
- `content/portfolio/` — Portfolio (title, category, image, description)
- `content/testimonials/` — Testimonials (name, location, quote, rating)

Uploaded images go to `images/uploads/`. Ensure your Git repo default branch matches `branch: main` in `admin/config.yml` (e.g. use `master` there if your repo uses `master`).

**Showing CMS content on the site:** The homepage loads `content.json` and renders Services, Portfolio, and Testimonials from it. Generate that file by running:
```bash
npm install
npm run build:content
```
This reads all `.md` files in `content/` and writes `content.json`. Run it after editing in the CMS (or add it to your deploy: on Netlify set **Build command** to `npm run build:content` so each deploy regenerates `content.json`).

## 📂 Which files to push to GitHub
Push **everything except** `node_modules/`. A `.gitignore` is set so Git will skip `node_modules/` automatically.

| Include | Don’t include |
|--------|-----------------|
| `index.html`, `content.json` | `node_modules/` (reinstall with `npm install`) |
| `admin/`, `content/`, `css/`, `js/`, `images/` | |
| `scripts/`, `package.json`, `package-lock.json` | |
| `README.md`, `.gitignore` | |

## 🚀 How to push to GitHub
1. **Install Git** if needed: [git-scm.com](https://git-scm.com/).
2. **Create a new repo on GitHub**: GitHub.com → **New repository** → name it (e.g. `fairway-electrical`) → **Create repository** (don’t add a README if this folder already has one).
3. **Open PowerShell** in your project folder (e.g. `cd "C:\Users\daveg\Documents\Websites\Fairway Electrical"`).
4. **Turn the folder into a Git repo and push:**
   ```powershell
   git init
   git add .
   git status
   git commit -m "Initial commit: Fairway Electrical site and Decap CMS"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your GitHub username and repo name. If GitHub asks you to sign in, use a **Personal Access Token** as the password (GitHub → Settings → Developer settings → Personal access tokens).
5. After the first push, any time you make changes:  
   `git add .` → `git commit -m "Describe your change"` → `git push`.

## 📦 Deployment (Netlify)
1.  **Build settings**:
    *   **Publish directory**: `.` (project root)
    *   **Build command**: `npm run build:content` (so `content.json` is regenerated from CMS content on each deploy)
2.  Enable **Identity** and **Git Gateway** if you want to use the CMS on the live site.

## 📁 Folder Structure
```
/
├── index.html          # Main homepage
├── admin/              # Decap CMS
│   ├── index.html
│   └── config.yml
├── content/            # CMS-editable content (Markdown)
│   ├── services/
│   ├── portfolio/
│   └── testimonials/
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/             # Static assets + uploads
    └── uploads/        # CMS-uploaded images
```
