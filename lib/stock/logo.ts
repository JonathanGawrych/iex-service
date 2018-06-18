import { PREFIX } from '../config';

// https://iextrading.com/developer/docs/#logo
// This is a helper function, but the google APIs url is standardized.
export namespace Logo {
	export const path = (symbol: string) => PREFIX + `/stock/${symbol}/logo`;

	export interface Response {
		url: string,
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
