# n8n-nodes-knockknock

Official n8n community node for **KnockKnock**: scrape websites, extract structured JSON, capture screenshots, run SEO audits, and analyze sitemaps.

## Installation

### Via n8n UI (Recommended)

In your n8n instance, go to **Settings -> Community Nodes -> Install** and enter:

```text
n8n-nodes-knockknock
```

### Via npm

```bash
npm install n8n-nodes-knockknock
```

## Authentication

1. Create an API key at [KnockKnock Dashboard](https://knockknock.hooxmedia.com/dashboard).
2. In n8n, add a **KnockKnock API** credential and paste your API key.

## Supported Resources & Operations

- **Page**
  - **Scrape Page:** Convert any webpage, PDF, or DOCX into clean Markdown and metadata.
  - **Extract Structured Data:** Extract structured JSON using an AI prompt or JSON Schema.
  - **Capture Screenshot:** Capture desktop and mobile PNG screenshots (attached as n8n binary PNG data).
  - **SEO Audit:** Run an on-page and technical SEO audit on a URL.
- **Website**
  - **Batch Scrape:** Scrape multiple URLs concurrently in a single request.
  - **Map Site:** Discover XML sitemaps and internal links across a domain.
- **Search**
  - **Search Web:** Search the live web with domain and recency filters.

## AI Agent Compatibility

This node has `usableAsTool: true` enabled and can be attached directly to n8n **AI Agent** nodes as a tool (set `N8N_COMMUNITY_PACKAGES_ALLOW_TOOL_USAGE=true` on self-hosted n8n instances).

## Documentation & Support

- **Documentation:** [GitHub README](https://github.com/ganpatsherawat/n8n-nodes-knockknock#readme)
- **Authentication Guide:** [Authentication](https://github.com/ganpatsherawat/n8n-nodes-knockknock#authentication)
- **Support:** [ask@email.hooxmedia.com](mailto:ask@email.hooxmedia.com)
