# Piyush Yadav Portfolio

A personal developer portfolio built with React, Vite, Tailwind CSS, GSAP, and Lucide icons. The site is structured as a single-page portfolio with animated navigation, hero content, stats, about, projects, experience, education, skills, contact links, downloadable resume, and profile image.

The portfolio content is separated from the UI so updates can be made from one data file without touching the component layout.

## Features

- Single-page responsive portfolio
- Smooth section scrolling
- GSAP reveal animations and animated counters
- Custom cursor interaction on desktop
- Data-driven content for profile, projects, skills, experience, education, and contact details
- Downloadable resume from `public/resume.pdf`
- Profile image served from `public/piyush-photo.jpg`

## Tech Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- GSAP
- Lucide React

## Project Structure

```text
.
├── public/
│   ├── piyush-photo.jpg
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   ├── components/
│   │   └── data/
│   │       └── portfolio.ts
│   ├── main.tsx
│   └── styles/
├── index.html
├── package.json
├── package-lock.json
└── vite.config.ts
```

## Editing Portfolio Content

Most portfolio content lives in:

```text
src/app/data/portfolio.ts
```

Update this file to change:

- Name, role, hero labels, and profile metadata
- GitHub, LinkedIn, and email links
- Navigation items and button labels
- About section text
- Projects and project links
- Skills and categories
- Stats
- Experience
- Education
- Contact section copy
- Footer text

Static files are stored in `public/`:

- Replace `public/resume.pdf` to update the downloadable resume
- Replace `public/piyush-photo.jpg` to update the profile image

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

The production build is generated in:

```text
dist/
```

## Deployment

This is a Vite static site, so it can be deployed to platforms such as Vercel, Netlify, GitHub Pages, or any static hosting provider.

Use this build command:

```bash
npm run build
```

Use this output directory:

```text
dist
```

## Notes

- Keep public asset paths rooted from `/`, for example `/resume.pdf` and `/piyush-photo.jpg`.
- If you add a live demo URL to a project, set the project `live` field in `portfolio.ts`.
- If you add or remove skill categories, the skills grid auto-fits the layout.
