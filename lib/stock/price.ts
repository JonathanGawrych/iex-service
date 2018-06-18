import { PREFIX } from '../config';

// https://iextrading.com/developer/docs/#price
/**
 * A single number, being the IEX real time price, the 15 minute delayed market price,
 * or the previous close price, is returned.
 */
export namespace Price {
	export const path = (symbol: string) => PREFIX + `/stock/${symbol}/price`;

	export type Response = number;

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.text()).then(priceStr => +priceStr);
	}
}
