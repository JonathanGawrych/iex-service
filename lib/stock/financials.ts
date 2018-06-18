// https://iextrading.com/developer/docs/#financials
// Pulls income statement, balance sheet, and cash flow data from the four most recent reported quarters.
export namespace Financials {
	export const path = (symbol: string) => `/stock/{symbol}/financials`;

	export interface Quarter {
		reportDate: string,
		grossProfit: number,
		costOfRevenue: number,
		operatingRevenue: number,
		totalRevenue: number,
		operatingIncome: number,
		netIncome: number,
		researchAndDevelopment: number,
		operatingExpense: number,
		currentAssets: number,
		totalAssets: number,
		totalLiabilities: number,
		currentCash: number,
		currentDebt: number,
		totalCash: number,
		totalDebt: number,
		shareholderEquity: number,
		cashChange: number,
		cashFlow: number,
		operatingGainsLosses: string,
		[futureProp: string]: any
	}

	export interface Response {
		symbol: string,
		financials: Quarter[],
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
