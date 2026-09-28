# How to Add a New Project — Alfaizkhan Portfolio

Adding a new project to your portfolio takes **less than 60 seconds** and requires **zero coding**!

You **NEVER** need to create new HTML files, duplicate React components, or modify routes.

---

## ⚡ The 7 Simple Steps

### Step 1: Create an image folder
Create a new folder inside `/public/images/projects/` named after your project slug (use lowercase and hyphens):
```
/public/images/projects/my-project/
```

### Step 2: Put your images inside that folder
Add your project pictures into that folder:
* `thumbnail.png` *(Main card cover image)*
* `screenshot-1.png` *(Optional detail preview)*
* `screenshot-2.png` *(Optional detail preview)*

> 💡 **Tip:** If you don't have images yet, **don't worry!** The website automatically displays a high-tech fallback vector placeholder. It will never show a broken image.

---

### Step 3: Open `projects.js`
Open the single project source of truth file:
```
/data/projects.js
```

---

### Step 4: Copy the Project Template
Scroll to the bottom of `/data/projects.js`. You will see this template:

```javascript
// ============================================
// COPY THIS TEMPLATE TO ADD A NEW PROJECT
// ============================================

{
  id: "my-new-project",
  title: "My New Project",
  slug: "my-new-project",
  category: "Web Development", // e.g. "Web Development", "College Project", "Hackathon", "Python", "AI/ML", "C/C++", "Database", "Other"
  shortDescription: "Short one or two line summary of what this project does.",
  description: "Detailed description of the project, why you built it, and how it works.",
  problem: "What problem does this project solve?",
  solution: "How does the project solve the problem?",
  features: [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ],
  technologies: [
    "Python",
    "React",
    "Tailwind CSS"
  ],
  image: "/images/projects/my-new-project/thumbnail.png",
  screenshots: [
    "/images/projects/my-new-project/screenshot-1.png",
    "/images/projects/my-new-project/screenshot-2.png"
  ],
  github: "https://github.com/alfaizkhan/my-new-project",
  liveDemo: "",
  date: "2026",
  role: "Developer",
  featured: false // Set to true if you want it on the homepage
}
```

---

### Step 5: Paste and change the information
Paste the copied block into the `projects` array in `/data/projects.js` and customize:
- `title`: Name of your project
- `slug`: URL identifier (e.g. `my-new-project` creates `/projects/my-new-project`)
- `category`: e.g. `"Web Development"`, `"College Project"`, `"Hackathon"`, `"Python"`, `"AI/ML"`, `"C/C++"`, `"Database"`, or any custom category
- `technologies`: Array of strings (e.g. `["Python", "MySQL", "JavaScript"]`)
- `image`: Path to your thumbnail (e.g. `"/images/projects/my-project/thumbnail.png"`)
- `github`: Your repository URL (or `""` if not uploaded yet — empty buttons are hidden safely)
- `liveDemo`: Live website URL (or `""` if not deployed yet)
- `featured`: Set to `true` to display on the Home page, or `false` for Projects showcase only

---

### Step 6: Save the file
Press `Ctrl + S` in your code editor.

---

### Step 7: Run the website
In your terminal, run:
```bash
npm run dev
```

The website will **automatically**:
✅ Create the responsive Project Card on the Projects page  
✅ Generate Technology Badges  
✅ Create the dynamic Project Detail Page at `/projects/<your-slug>`  
✅ Index your project for instant keyword search  
✅ Update the dynamic Category Filter  
✅ Display in the Featured Projects section on the Home page (if `featured: true`)  
✅ Update the homepage total project count counter (e.g. `04+ Projects`)  

---

## 🚫 What You Should NEVER Modify When Adding a Project

To ensure your website stays stable and never breaks, you do **NOT** need to edit:
* ❌ `ProjectCard.jsx`
* ❌ `ProjectGrid.jsx`
* ❌ `ProjectDetail.jsx`
* ❌ `App.jsx` or any routes
* ❌ `index.html`
* ❌ CSS or styling files
* ❌ Navbar navigation
* ❌ Filter components

Everything is completely dynamic and powered by **`/data/projects.js`**!

---

## 🛡️ Built-in Safety Protections

Your portfolio has automatic safeguards so nothing ever crashes:
* **Missing image?** Displays an automatic sleek dark vector fallback graphic.
* **Missing GitHub URL?** The GitHub button safely hides itself.
* **Missing Live Demo URL?** The Live Demo button safely hides itself.
* **Missing screenshots or features?** Those sections simply hide without errors.
* **New category?** Automatically appears in the filter bar.
