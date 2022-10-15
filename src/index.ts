import { default as requestHelper, RequestParameters } from './helpers/request.js';

const HETZNER_BASE_URL = 'https://api.hetzner.cloud/v1';

interface ServerMetricsParameters {
	type: 'cpu' | 'disk' | 'network';
	start: Date;
	end: Date;
};

export default class Hetzner {
	apiKey: string;
	baseUrl: string;
	headers: object;

	constructor(apiKey: string, baseUrl?: string) {
		this.apiKey = apiKey;
		this.baseUrl = baseUrl || HETZNER_BASE_URL;
		this.headers = {
			'Authorization': `Bearer ${this.apiKey}`,
			'Content-Type': 'application/json',
		};
	}

	// Utils
	async request(path: string = '', parameters: RequestParameters = {}) {
		return await requestHelper({
			method: parameters?.method || 'get',
			url: `${HETZNER_BASE_URL}${path}`,
			headers: this.headers,
			...parameters,
		});
	}

	// Servers
	public readonly servers = {
		create: async (parameters: object = {}): Promise<any> => {
			const result = await this.request('/servers', { method: 'post', data: parameters });
			return result?.server || result;
		},
		list: async (): Promise<any>  => {
			const result = await this.request('/servers');
			return result?.servers || result;
		},
		get: async (serverId: number): Promise<any> => {
			const result = await this.request(`/servers/${serverId}`);
			return result?.server || result;
		},
		getMetrics: async (serverId: number, parameters: ServerMetricsParameters): Promise<any> => {
			const result = await this.request(`/servers/${serverId}/metrics`, {
				params: {
					type: parameters.type,
					start: parameters.start.toISOString(),
					end: parameters.end.toISOString(),
				} 
			});
			return result?.metrics || result;
		},
		update: async (serverId: number, parameters: object = {}): Promise<any> => {
			const result = await this.request(`/servers/${serverId}`, { method: 'put', data: parameters });
			return result?.server || result;
		},
		delete: async (serverId: number): Promise<any> => {
			const result = await this.request(`/servers/${serverId}`, { method: 'delete' });
			return result;
		},
	};
};
