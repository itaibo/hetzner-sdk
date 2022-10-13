import axios from 'axios';

interface RequestParameters {
	method?: string;
	url?: string;
	data?: object;
	headers?: object;
	params?: object;
};

export default async function request(parameters: RequestParameters) {
	let response: any;

	try {
		response = await axios(parameters);
	} catch (e) {
		return { error: e.response?.data?.error || e };
	}

	return response?.data;
};
