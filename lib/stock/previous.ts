import { PREFIX } from 'config';

// https://iextrading.com/developer/docs/#previous
/**
 * This returns previous day adjusted price data for a single stock,
 * or an object keyed by symbol of price data for the whole market.
 */
export namespace Previous {
	export const path = (symbol: string) => PREFIX + `/stock/{symbol}/previous`;

	export interface Response {
		symbol: string,           // The stock ticker.
		date: string,             // The date of the returned data in the format YYYY-MM-DD
		open: number,             //
		high: number,             //
		low: number,              //
		close: number,            //
		volume: number,           // Adjusted for splits
		unadjustedVolume: number, //
		change: number,           //
		changePercent: number,    //
		vwap: number,             // Volume weighted average price
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
