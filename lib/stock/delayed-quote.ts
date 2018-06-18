// https://iextrading.com/developer/docs/#delayed-quote
// The 15 minute delayed market quote.
export namespace DelayedQuote {
	export const path = (symbol: string) => `/stock/{symbol}/delayed-quote`;

	export interface Response {
		symbol: string,           // The stock ticker
		delayedPrice: number,     // The 15 minute delayed market price
		delayedSize: number,      // The 15 minute delayed last trade size
		delayedPriceTime: number, // The time of the delayed market price
		processedTime: number,    // The time when IEX processed the SIP price
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
