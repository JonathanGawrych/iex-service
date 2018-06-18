import { PREFIX } from 'config';
import { RangeOption } from './range'

// https://iextrading.com/developer/docs/#splits
export namespace Splits {
	export const path = (symbol: string, range: RangeOption) => PREFIX + `/stock/{symbol}/splits/{range}`;

	export interface Response {
		exDate: string,           // The dividend ex-date
		paymentDate: string,      // The payment date
		recordDate: string,       // The dividend record date
		declaredDate: string,     // The dividend declaration date
		ratio: number,            // The split ratio. The split ratio is an inverse of the number of shares that
		                          // a holder of the stock would have after the split divided by the number of
		                          // shares that the holder had before.
		toFactor: string,         // To factor of the split. Used to calculate the split ratio forfactor/tofactor = ratio
		forFactor: string,        // For factor of the split. Used to calculate the split ratio forfactor/tofactor = ratio
		[futureProp: string]: any
	}

	export function get(symbol: string, range: RangeOption = '1m'): Promise<Response> {
		return fetch(path(symbol, range)).then(res => res.json());
	}
}
