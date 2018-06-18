import { PREFIX } from '../config';

// https://iextrading.com/developer/docs/#relevant
/**
 * Similar to the peers endpoint, except this will return most active market symbols when
 * peers are not available. If the symbols returned are not peers, the peers key will be false.
 * This is not intended to represent a definitive or accurate list of peers, and is subject to change at any time.
 */
export namespace Relevant {
	export const path = (symbol: string) => PREFIX + `/stock/{symbol}/relevant`;

	export interface Response {
		peers: boolean,
		symbols: string[],
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
