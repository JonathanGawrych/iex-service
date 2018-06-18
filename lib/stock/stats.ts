// https://iextrading.com/developer/docs/#stats
export namespace Stats {
	export const path = (symbol: string) => `/stock/{symbol}/stats`;

	export interface Response {
		companyName: string,         //
		marketcap: number,           // Not calculated in real time
		beta: number,                //
		week52high: number,          //
		week52low: number,           //
		week52change: number,        //
		shortInterest: number,       //
		shortDate: string,           //
		dividendRate: number,        //
		dividendYield: number,       //
		exDividendDate: string,      //
		latestEPS: number,           // Most recent quarter
		latestEPSDate: string,       //
		sharesOutstanding: number,   //
		float: number,               //
		returnOnEquity: number,      // Trailing twelve months
		consensusEPS: number,        // Most recent quarter
		numberOfEstimates: number,   // Most recent quarter
		symbol: string,              //
		EBITDA: number,              // Trailing twelve months
		revenue: number,             // Trailing twelve months
		grossProfit: number,         // Trailing twelve months
		cash: number,                // Total cash. Trailing twelve months
		debt: number,                // Total debt. Trailing twelve months
		ttmEPS: number,              // Trailing twelve months
		revenuePerShare: number,     // Trailing twelve months
		revenuePerEmployee: number,  // Trailing twelve months
		peRatioHigh: number,         //
		peRatioLow: number,          //
		EPSSurpriseDollar: number,   // The difference between actual EPS and consensus EPS in dollars
		EPSSurprisePercent: number,  // The percent difference between actual EPS and consensus EPS
		returnOnAssets: number,      // Trailing twelve months
		returnOnCapital: number,     // Trailing twelve months
		profitMargin: number,        //
		priceToSales: number,        //
		priceToBook: number,         //
		day200MovingAvg: number,     //
		day50MovingAvg: number,      //
		institutionPercent: number,  // Top 15 institutions
		insiderPercent: number,      //
		shortRatio: number,          //
		year5ChangePercent: number,  //
		year2ChangePercent: number,  //
		year1ChangePercent: number,  //
		ytdChangePercent: number,    //
		month6ChangePercent: number, //
		month3ChangePercent: number, //
		month1ChangePercent: number, //
		day5ChangePercent: number,   //
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
