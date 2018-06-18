// https://iextrading.com/developer/docs/#quote
export namespace Quote {
	export const path = (symbol: string) => `/stock/{symbol}/quote`;

	export interface Request {
		displayPercent?: boolean; // If set to true, all percentage values will be multiplied by a factor of 100
	}

	export type CalculationPrice = 'tops' | 'sip' | 'previousclose' | 'close';
	export type LatestSource = 'IEX real time price' | '15 minute delayed price' | 'Previous close' | 'Close';

	export interface Response {
		symbol: string,                     // The stock ticker
		companyName: string,                // The company name
		primaryExchange: string,            // The primary listings exchange
		sector: string,                     // The sector of the stock
		calculationPrice: CalculationPrice, // The source of the latest price
		open: number,                       // The official open price
		openTime: number,                   // The official listing exchange time for the open
		close: number,                      // The official close price
		closeTime: number,                  // The official listing exchange time for the close
		high: number,                       // The market-wide highest price from the SIP. 15 minute delayed
		low: number,                        // The market-wide lowest price from the SIP. 15 minute delayed
		latestPrice: number,                // The latest price being the IEX real time price, the 15 minute delayed market price, or the previous close price
		latestSource: string,               // The source of latestPrice
		latestTime: string,                 // A human readable time of the latestPrice. The format will vary based on latestSource
		latestUpdate: number,               // The update time of latestPrice in milliseconds since midnight Jan 1, 1970
		latestVolume: number,               // The total market volume of the stock
		iexRealtimePrice: number,           // Last sale price of the stock on IEX
		iexRealtimeSize: number,            // Last sale size of the stock on IEX
		iexLastUpdated: number,             // The last update time of the data in milliseconds since midnight Jan 1, 1970 UTC or -1 or 0. If the value is -1 or 0, IEX has not quoted the symbol in the trading day
		delayedPrice: number,               // The 15 minute delayed market price during normal market hours 9:30 - 16:00
		delayedPriceTime: number,           // The time of the delayed market price during normal market hours 9:30 - 16:00
		extendedPrice: number,              // The 15 minute delayed market price outside normal market hours 8:00 - 9:30 and 16:00 - 17:00
		extendedChange: number,             // Is calculated using extendedPrice from calculationPrice
		extendedChangePercent: number,      // Is calculated using extendedPrice from calculationPrice
		extendedPriceTime: number,          // The time of the delayed market price outside normal market hours 8:00 - 9:30 and 16:00 - 17:00
		change: number,                     // Is calculated using calculationPrice from previousClose
		changePercent: number,              // Is calculated using calculationPrice from previousClose
		iexMarketPercent: number,           // IEX’s percentage of the market in the stock
		iexVolume: number,                  // Shares traded in the stock on IEX
		avgTotalVolume: number,             // The 30 day average volume on all markets
		iexBidPrice: number,                // The best bid price on IEX
		iexBidSize: number,                 // Amount of shares on the bid on IEX
		iexAskPrice: number,                // The best ask price on IEX
		iexAskSize: number,                 // Amount of shares on the ask on IEX
		marketCap: number,                  // Is calculated in real time using calculationPrice
		peRatio: number,                    // Is calculated in real time using calculationPrice
		week52High: number,                 // The adjusted 52 week high
		week52Low: number,                  // The adjusted 52 week low
		ytdChange: number,                  // The price change percentage from start of year to previous close
		[futureProp: string]: any
	}

	export function get(symbol: string, params?: Request): Promise<Response> {
		let url = path(symbol);
		if (params != null) {
			// @ts-ignore - see https://github.com/Microsoft/TypeScript/issues/15338
			url += '?' + new URLSearchParams(params);
		}

		return fetch(url).then(res => res.json());
	}
}
