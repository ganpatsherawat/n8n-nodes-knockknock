import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { KnockKnock } = require('../dist/nodes/KnockKnock/KnockKnock.node.js');
const { KnockKnockApi } = require('../dist/credentials/KnockKnockApi.credentials.js');

test('KnockKnock node metadata, resources, and AI Agent compatibility', () => {
	const node = new KnockKnock();
	assert.equal(node.description.displayName, 'KnockKnock');
	assert.equal(node.description.name, 'knockKnock');
	assert.equal(node.description.usableAsTool, true);

	const resourceProp = node.description.properties.find((p) => p.name === 'resource');
	assert.ok(resourceProp);
	assert.deepEqual(
		resourceProp.options.map((o) => o.value),
		['page', 'search', 'website'],
	);

	const opValues = node.description.properties
		.filter((p) => p.name === 'operation')
		.flatMap((p) => p.options.map((o) => o.value));
	assert.deepEqual(opValues.sort(), ['batch', 'extract', 'map', 'scrape', 'screenshot', 'search', 'seo']);
});

test('KnockKnock Codex metadata includes required aliases and valid categories', () => {
	const codex = JSON.parse(fs.readFileSync('dist/nodes/KnockKnock/KnockKnock.node.json', 'utf8'));
	assert.ok(codex.categories.includes('Marketing & Content'));
	for (const alias of ['scrape', 'extract', 'screenshot', 'seo', 'audit', 'sitemap', 'search', 'markdown']) {
		assert.ok(codex.alias.includes(alias), `Missing alias: ${alias}`);
	}
});

test('KnockKnockApi credentials validate API key via /v1/auth/verify', () => {
	const creds = new KnockKnockApi();
	assert.equal(creds.name, 'knockKnockApi');
	assert.equal(creds.icon, 'file:knockknock.png');
	assert.equal(creds.test.request.url, '/v1/auth/verify');
	assert.equal(creds.test.request.method, 'GET');
});
