# KnockKnock v1.0.1: Final Release Preparation

## 1. Production Authentication Endpoint (`GET /v1/auth/verify`)
- **Deployed:** `knockknock-worker` (`Version ID: 1152eedf-5666-4c50-9982-5b1ccfc39d8e`)
- **Verification:**
  - Missing key: `401`
  - Invalid key: `401`
  - Valid key: `200 { "valid": true }` (0 credits consumed, no scraping)

---

## 2. npm First-Publication & Trusted Publishing (OIDC)
- **Workflow:** `.github/workflows/release.yml`
  - Triggers on `v*` tags (`ubuntu-latest`, Node `22`, `id-token: write`)
  - Runs `npm ci --ignore-scripts`, `npm run lint`, `npm run build`, `npm test`, `npx --yes @n8n/scan-community-package .`, and `npm publish --provenance --access public`
- **First Publish:** Add a temporary granular npm token as `NPM_TOKEN` in GitHub Actions secrets (`https://github.com/ganpatsherawat/n8n-nodes-knockknock/settings/secrets/actions`), then push tag `v1.0.1`.
- **Switch to OIDC:** After `1.0.1` is live on npmjs.com, go to **Package Settings -> Trusted Publisher (GitHub Actions)**, link `ganpatsherawat/n8n-nodes-knockknock` + `release.yml`, remove `NODE_AUTH_TOKEN` from `release.yml`, and delete `NPM_TOKEN`.

---

## 3. n8n Verification Submission Checklist
- [x] Public GitHub repository (`https://github.com/ganpatsherawat/n8n-nodes-knockknock`)
- [x] Matching `repository` metadata in `package.json`
- [x] `MIT` license
- [x] `README.md` with installation, auth, and operations
- [x] Zero external runtime dependencies
- [x] `@n8n/scan-community-package` compliance
- [x] GitHub Actions provenance (`--provenance`)
- [ ] Publish `v1.0.1` to npm (awaiting your `NPM_TOKEN` + tag push approval)
