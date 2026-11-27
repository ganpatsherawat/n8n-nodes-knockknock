import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

const OPERATION_ENDPOINTS: Record<string, string> = {
	scrape: '/scrape',
	extract: '/extract',
	batch: '/batch/scrape',
	map: '/map',
	search: '/search',
	screenshot: '/screenshot',
	seo: '/seo',
};

export class KnockKnock implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'KnockKnock',
		name: 'knockKnock',
		icon: 'file:knockknock.png',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Scrape websites, extract content, capture screenshots, run SEO audits, and analyze sitemaps',
		defaults: {
			name: 'KnockKnock',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'knockKnockApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				default: 'page',
				options: [
					{
						name: 'Page',
						value: 'page',
					},
					{
						name: 'Search',
						value: 'search',
					},
					{
						name: 'Website',
						value: 'website',
					},
				],
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'scrape',
				displayOptions: {
					show: {
						resource: ['page'],
					},
				},
				options: [
					{
						name: 'Capture Screenshot',
						value: 'screenshot',
						description: 'Capture desktop and mobile PNG screenshots of a webpage',
						action: 'Capture a webpage screenshot',
					},
					{
						name: 'Extract Structured Data',
						value: 'extract',
						description: 'Extract structured JSON using an AI prompt or JSON Schema',
						action: 'Extract structured data from a page',
					},
					{
						name: 'Scrape Page',
						value: 'scrape',
						description: 'Convert any webpage, PDF, or DOCX into clean Markdown and metadata',
						action: 'Scrape a page or document',
					},
					{
						name: 'SEO Audit',
						value: 'seo',
						description: 'Run an on-page and technical SEO audit on a URL',
						action: 'Run an SEO audit on a page',
					},
				],
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'map',
				displayOptions: {
					show: {
						resource: ['website'],
					},
				},
				options: [
					{
						name: 'Batch Scrape',
						value: 'batch',
						description: 'Scrape multiple URLs concurrently in a single request',
						action: 'Batch scrape multiple pages',
					},
					{
						name: 'Map Site',
						value: 'map',
						description: 'Discover XML sitemaps and internal links across a domain',
						action: 'Map a website and discover links',
					},
				],
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				default: 'search',
				displayOptions: {
					show: {
						resource: ['search'],
					},
				},
				options: [
					{
						name: 'Search Web',
						value: 'search',
						description: 'Search the live web with domain and recency filters',
						action: 'Search the live web',
					},
				],
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://example.com',
				description: 'Target URL to process',
				displayOptions: {
					show: {
						operation: ['scrape', 'extract', 'map', 'screenshot', 'seo'],
					},
				},
			},
			{
				displayName: 'URLs',
				name: 'urls',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'https://example.com, https://example.org',
				description: 'Comma-separated list of URLs to scrape concurrently',
				displayOptions: {
					show: {
						operation: ['batch'],
					},
				},
			},
			{
				displayName: 'Search Query',
				name: 'query',
				type: 'string',
				default: '',
				required: true,
				placeholder: 'web scraping tools',
				description: 'Query string for live web search',
				displayOptions: {
					show: {
						operation: ['search'],
					},
				},
			},
			{
				displayName: 'Extraction Prompt',
				name: 'prompt',
				type: 'string',
				typeOptions: { rows: 3 },
				default: '',
				placeholder: 'Extract product title, price, and key features',
				description: 'Natural language instructions for AI structured extraction',
				displayOptions: {
					show: {
						operation: ['extract'],
					},
				},
			},
			{
				displayName: 'JSON Schema',
				name: 'schema',
				type: 'json',
				default: '',
				description: 'Optional JSON Schema to enforce structured output',
				displayOptions: {
					show: {
						operation: ['extract'],
					},
				},
			},
			{
				displayName: 'Devices',
				name: 'devices',
				type: 'multiOptions',
				default: ['desktop'],
				options: [
					{ name: 'Desktop', value: 'desktop' },
					{ name: 'Mobile', value: 'mobile' },
				],
				description: 'Devices to capture in screenshot mode',
				displayOptions: {
					show: {
						operation: ['screenshot'],
					},
				},
			},
			{
				displayName: 'Additional Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Exclude CSS Selectors',
						name: 'excludeTags',
						type: 'string',
						default: '',
						description: 'Comma-separated CSS selectors to exclude',
					},
					{
						displayName: 'Include CSS Selectors',
						name: 'includeTags',
						type: 'string',
						default: '',
						description: 'Comma-separated CSS selectors to include',
					},
					{
						displayName: 'Remove Images',
						name: 'removeImages',
						type: 'boolean',
						default: false,
						description: 'Whether to strip image tags from Markdown output',
					},
					{
						displayName: 'Render Mode',
						name: 'render',
						type: 'options',
						default: 'default',
						options: [
							{ name: 'Default', value: 'default' },
							{ name: 'Stealth', value: 'stealth' },
							{ name: 'Browser', value: 'browser' },
						],
						description: 'Fetching strategy for JS-heavy or protected pages',
					},
					{
						displayName: 'Result Limit',
						name: 'limit',
						type: 'number',
						typeOptions: {
							minValue: 1,
						},
						default: 50,
						description: 'Max number of results to return',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('knockKnockApi');
		const baseUrl = String(credentials.baseUrl || 'https://knockknock.hooxmedia.com').replace(/\/+$/, '');

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				const endpoint = OPERATION_ENDPOINTS[operation];
				if (!endpoint) {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, { itemIndex: i });
				}

				const options = this.getNodeParameter('options', i, {}) as IDataObject;
				const body: IDataObject = {};

				if (['scrape', 'extract', 'map', 'screenshot', 'seo'].includes(operation)) {
					body.url = this.getNodeParameter('url', i) as string;
				}
				if (operation === 'batch') {
					const rawUrls = this.getNodeParameter('urls', i) as string;
					body.urls = rawUrls.split(',').map((u) => u.trim()).filter(Boolean);
				}
				if (operation === 'search') {
					body.query = this.getNodeParameter('query', i) as string;
					if (options.limit) body.limit = options.limit;
				}
				if (operation === 'extract') {
					const prompt = this.getNodeParameter('prompt', i, '') as string;
					const schemaRaw = this.getNodeParameter('schema', i, '') as string;
					if (prompt) body.prompt = prompt;
					if (schemaRaw) {
						body.schema = typeof schemaRaw === 'string' ? JSON.parse(schemaRaw) : schemaRaw;
					}
				}
				if (operation === 'screenshot') {
					body.devices = this.getNodeParameter('devices', i, ['desktop']) as string[];
				}

				if (options.render && options.render !== 'default') body.render = options.render;
				if (typeof options.removeImages === 'boolean') body.removeImages = options.removeImages;
				if (options.includeTags) {
					body.includeTags = String(options.includeTags).split(',').map((s) => s.trim()).filter(Boolean);
				}
				if (options.excludeTags) {
					body.excludeTags = String(options.excludeTags).split(',').map((s) => s.trim()).filter(Boolean);
				}

				const requestOptions: IHttpRequestOptions = {
					method: 'POST',
					url: `${baseUrl}${endpoint}`,
					body,
					json: true,
					timeout: 60000,
				};

				const response = (await this.helpers.httpRequestWithAuthentication.call(
					this,
					'knockKnockApi',
					requestOptions,
				)) as IDataObject;

				const executionItem: INodeExecutionData = {
					json: response,
					pairedItem: { item: i },
				};

				if (operation === 'screenshot') {
					const screenshots = (response.screenshots || (response.data as IDataObject)?.screenshots) as
						| Record<string, string>
						| undefined;
					if (screenshots && typeof screenshots === 'object') {
						executionItem.binary = {};
						for (const [device, imgUrl] of Object.entries(screenshots)) {
							if (typeof imgUrl === 'string' && imgUrl.startsWith('http')) {
								const imgBuffer = (await this.helpers.httpRequestWithAuthentication.call(
									this,
									'knockKnockApi',
									{
										method: 'GET',
										url: imgUrl,
										encoding: 'arraybuffer',
									},
								)) as Buffer;
								executionItem.binary[device] = await this.helpers.prepareBinaryData(
									imgBuffer,
									`screenshot_${device}.png`,
									'image/png',
								);
							}
						}
					}
				}

				returnData.push(executionItem);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw new NodeApiError(this.getNode(), error as never, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
