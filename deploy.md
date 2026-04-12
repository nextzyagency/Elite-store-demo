0. VARS
USER: "<github-user-or-org>"
REPO: "<repo-name>"
BRANCH: "main"
NODE: "22"
1. ASTRO CONFIG (MANDATORY)

astro.config.mjs

export default defineConfig({
  site: 'https://<USER>.github.io',
  base: '/<REPO>',
  integrations: [tailwind()],
});

RULES

site = dominio GitHub
base = repo exacto
REQUIRED before coding
2. ROUTING (CRITICAL)

❌ NEVER:

<img src="/img/x.jpg" />

✅ ALWAYS:

---
const b = import.meta.env.BASE_URL.replace(/\/$/, '');
---
<img src={`${b}/img/x.jpg`} />

RULES

strip trailing /
manually add /
3. WORKFLOW

.github/workflows/deploy.yml

name: deploy

on:
  push: { branches: [main] }
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm install --legacy-peer-deps
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - id: d
        uses: actions/deploy-pages@v4

RULES

use --legacy-peer-deps
output = /dist
4. GIT INIT
git init
git checkout -b main
git add .
git commit -m "init"
git remote add origin https://github.com/<USER>/<REPO>.git
git push -u origin main

FIX (if needed)

git branch -M main
5. GITHUB PAGES (MANUAL)

Settings → Pages → Source = GitHub Actions

IF NOT → 404

6. URL
https://<USER>.github.io/<REPO>/
7. ERRORS
refspec main → create branch main
404 → enable Pages source
ERESOLVE → use --legacy-peer-deps
images fail → use BASE_URL
8. FINAL CHECK
config: ok
routing: base_url
workflow: ok
git: main+pushed
pages: actions
deploy: success
