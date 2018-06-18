import { PREFIX } from '../config';

// https://iextrading.com/developer/docs/#news
export namespace News {
	export type Last =  1 |  2 |  3 |  4 |  5 |  6 |  7 |  8 |  9 | 10 // (10 default)
	                 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
	                 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
	                 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
	                 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50;

	export const path = (symbol: string, last: Last) => PREFIX + `/stock/{symbol}/news/last/{last}`;

	export interface Response {
		datetime: string,
		headline: string,
		source: string,
		url: string,
		summary: string,
		related: string,
		[futureProp: string]: any
	}

	export function get(symbol: string, last: Last = 10): Promise<Response> {
		return fetch(path(symbol, last)).then(res => res.json());
	}
}
