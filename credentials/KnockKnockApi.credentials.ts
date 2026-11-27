import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class KnockKnockApi implements ICredentialType {
	name = 'knockKnockApi';
	displayName = 'KnockKnock API';
	icon: Icon = 'file:knockknock.png';
	documentationUrl = 'https://knockknock.hooxmedia.com/dashboard';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your KnockKnock API key from https://knockknock.hooxmedia.com/dashboard',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://knockknock.hooxmedia.com',
			required: true,
			description: 'Base URL of the KnockKnock API',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/v1/auth/verify',
			method: 'GET',
		},
	};
}
