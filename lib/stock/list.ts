import { Quote } from './quote'

// https://iextrading.com/developer/docs/#list
export namespace List {
	export type Type = 'mostactive' | 'gainers' | 'losers' | 'iexvolume' | 'iexpercent';

	export const path = (type: Type) => `/stock/market/list/{type}`;

	export interface Request {
		displayPercent?: boolean; // If set to true, all percentage values will be multiplied by a factor of 100
	}

	export type Response = Quote.Response[];

	export function get(type: Type, params?: Request): Promise<Response> {
		let url = path(type);
		if (params != null) {
			// @ts-ignore - see https://github.com/Microsoft/TypeScript/issues/15338
			url += '?' + new URLSearchParams(params);
		}

		return fetch(url).then(res => res.json());
	}
}
