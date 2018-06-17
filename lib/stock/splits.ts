// https://iextrading.com/developer/docs/#splits
export namespace Splits {
	export const path = (symbol: string, range: RangeOption) => `/stock/{symbol}/splits/{range}`;

	/**
	 * 5y -      Five years -    Historically market-wide data
	 * 2y -      Two years -     Historically market-wide data
	 * 1y -      One year -      Historically market-wide data
	 * ytd -     Year-to-date -  Historically market-wide data
	 * 6m -      Six months -    Historically market-wide data
	 * 3m -      Three months -  Historically market-wide data
	 * 1m -      One month -     Historically market-wide data (default)
	 */
	export type RangeOption = '5y' | '2y' | '1y' | 'ytd' | '6m' | '3m' | '1m';

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
