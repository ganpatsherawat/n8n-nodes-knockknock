# KnockKnock v1.0.1: Release & Trusted Publishing Audit

## 1. npm Publication & Provenance
- **Package:** `https://www.npmjs.com/package/n8n-nodes-knockknock`
- **Version:** `1.0.4` (`latest` dist-tag, published via GitHub Actions Run `46007290571`, commit `a75dedd`)
- **Provenance:** Active (`https://slsa.dev/provenance/v1`, `https://registry.npmjs.org/-/npm/v1/attestations/n8n-nodes-knockknock@1.0.4`)
- **n8n Creator Portal (`1.0.6` Preflight):** Wrapped `knockknock.png` in self-contained `nodes/KnockKnock/knockknock.svg` (Base64 data URI) and updated `KnockKnock.node.ts` to `icon: 'file:knockknock.svg'`. `npx @n8n/scan-community-package@beta .` **PASSED** with **0 errors**. Ready for `v1.0.6` release.
- **Trusted Publisher (OIDC):** Configured on `https://www.npmjs.com/package/n8n-nodes-knockknock/access`:
  - Provider: `GitHub Actions`
  - Owner: `ganpatsherawat`
  - Repository: `n8n-nodes-knockknock`
  - Workflow: `release.yml`
  - Permissions: `Allow npm publish`, `Allow npm dist-tag`

---

## 2. OIDC-Only Release Workflow (`.github/workflows/release.yml`)
- **Runtime:** `ubuntu-latest`, Node.js `24`, `id-token: write`
- **Stage A:** `npm@10.9.4`, `npm ci --ignore-scripts`, `npm run lint`, `npm run build`, `npm test`, `npx --yes @n8n/scan-community-package@0.39.0 .`
- **Stage B:** `npm@11.5.1`, `npm publish --provenance --access public` (no `NODE_AUTH_TOKEN` / `NPM_TOKEN` dependency)
- **Temporary Token:** `NPM_TOKEN` preserved in GitHub Actions Secrets temporarily until the next OIDC release succeeds.
