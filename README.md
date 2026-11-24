# Raul — IT Systems Portfolio

React + TypeScript + Vite + Tailwind + Framer Motion + Lucide.

## Run
    npm install
    npm run dev        # local
    npm run build      # type-check + production build into dist/

## Edit your details
Everything is in `src/data/portfolioData.ts`:
- `profile.email`, `profile.linkedin`, `profile.github` — empty by default; each contact item (and the CLI `contact` command) appears only once filled
- `projects[].repo` / `projects[].demo` — paste URLs; empty slots are hidden
- Update the static name/skills in the `<noscript>` and `<meta>` tags in `index.html` if they change.

## Add your CV
Replace `public/cv/Raul-CV.pdf` with your PDF (keep the filename, or change `profile.cv`).

## Deploy to GitHub Pages
`vite.config.ts` uses `base: './'`, so it works from any repo path.
1. Push to a GitHub repo, then run `npm run deploy` (builds and publishes `dist/` to the `gh-pages` branch).
2. Repo Settings → Pages → Source: "Deploy from a branch" → `gh-pages` / root.
