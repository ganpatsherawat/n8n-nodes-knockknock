# n8n-nodes-knockknock

Official n8n community node for **KnockKnock**: scrape websites, extract structured JSON, capture screenshots, run SEO audits, and analyze sitemaps.

## Installation

> **Note:** npm publication is currently pending.

Once published to npm, install in your n8n instance via **Settings -> Community Nodes -> Install**:

```text
n8n-nodes-knockknock
```

For local/pre-release testing, build a tarball with `npm pack` and install it into `/home/node/.n8n/nodes`.

## Authentication

1. Create an API key at [KnockKnock Dashboard](https://knockknock.hooxmedia.com/dashboard).
2. In n8n, add a **KnockKnock API** credential and paste your API key.

## Supported Operations

- **Scrape Page:** Convert any webpage, PDF, or DOCX into clean Markdown and metadata.
- **Extract Structured Data:** Extract structured JSON using an AI prompt or JSON Schema.
- **Batch Scrape:** Scrape multiple URLs concurrently in a single request.
- **Map Site:** Discover XML sitemaps and internal links across a domain.
- **Web Search:** Search the live web with domain and recency filters.
- **Capture Screenshot:** Capture desktop and mobile PNG screenshots (attached as binary data).
- **SEO Audit:** Run an on-page and technical SEO audit on a URL.

## AI Agent Compatibility

This node has `usableAsTool: true` enabled and can be attached directly to n8n **AI Agent** nodes as a tool.
