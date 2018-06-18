import { PREFIX } from '../config';

// https://iextrading.com/developer/docs/#ohlc
export namespace OHLC {
	export const path = (symbol: string) => PREFIX + `/stock/{symbol}/ohlc`;

	export interface OpenClose {
		price: number,            // The official open or close price
		time: number,             // The official listing exchange time for the open or close
	}

	export interface Response {
		open: OpenClose,          //
		close: OpenClose,         //
		high: number,             // The market-wide highest price from the SIP (15 minute delayed)
		low: number,              // The market-wide lowest price from the SIP (15 minute delayed)
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
