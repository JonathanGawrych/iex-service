import { PREFIX } from '../config';

// https://iextrading.com/developer/docs/#peers
export namespace Peers {
	export const path = (symbol: string) => PREFIX + `/stock/${symbol}/peers`;

	/**
	 * An array of peer tickers as defined by IEX. This is not intended to represent
	 * a definitive or accurate list of peers, and is subject to change at any time.
	 */
	export interface Response {
		[index: number]: string;
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
