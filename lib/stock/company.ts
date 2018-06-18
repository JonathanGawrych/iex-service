import { PREFIX } from '../config';

// https://iextrading.com/developer/docs/#company
export namespace Company {
	export const path = (symbol: string) => PREFIX + `/stock/{symbol}/company`;

	// The common issue type of the stock.
	// ad – American Depository Receipt (ADR’s)
	// re – Real Estate Investment Trust (REIT’s)
	// ce – Closed end fund (Stock and Bond Fund)
	// si – Secondary Issue
	// lp – Limited Partnerships
	// cs – Common Stock
	// et – Exchange Traded Fund (ETF)
	// (blank) = Not Available, i.e., Warrant, Note, or (non-filing) Closed Ended Funds
	export type IssueType = 'ad' | 're' | 'ce' | 'si' | 'lp' | 'cs' | 'et' | '';

	export interface Response {
		symbol: string,
		companyName: string,
		exchange: string,
		industry: string,
		website: string,
		description: string,
		CEO: string,
		issueType: IssueType,
		sector: string,
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
