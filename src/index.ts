import { default as requestHelper } from './helpers/request.js';

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
	async request(path: string = '', parameters: object = {}) {
		return await requestHelper({
			method: 'get',
			url: `${HETZNER_BASE_URL}${path}`,
			headers: this.headers,
			...parameters,
		});
	}

	// Servers
	async getServers(): Promise<any> {
		const result = await this.request('/servers');

		return result?.servers || result;
	}

	async getServer(serverId: number): Promise<any> {
		const result = await this.request(`/servers/${serverId}`);

		return result?.server || result;
	}

	async getServerMetrics(serverId: number, parameters: ServerMetricsParameters): Promise<any> {
		const result = await this.request(`/servers/${serverId}/metrics`, {
			params: {
				type: parameters.type,
				start: parameters.start.toISOString(),
				end: parameters.end.toISOString(),
			} 
		});

		return result?.metrics || result;
	}
};
