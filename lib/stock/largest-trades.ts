import { PREFIX } from '../config';

// https://iextrading.com/developer/docs/#largest-trades
// This returns 15 minute delayed, last sale eligible trades.
export namespace LargestTrades {
	export const path = (symbol: string) => PREFIX + `/stock/{symbol}/largest-trades`;

	export interface Response {
		price: number,            // The price of the trade
		size: number,             // The number of shares of the trade
		time: number,             // The time of the trade
		timeLabel: string,        // Formatted time string as HH:MM:SS
		venue: string,            // The venue where the trade occurred. None refers to a TRF (off exchange) trade
		venueName: string,        // Formatted venue name where the trade occurred
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
