import { PREFIX } from 'config';

// https://iextrading.com/developer/docs/#earnings
// Pulls data from the four most recent reported quarters.
export namespace Earnings {
	export const path = (symbol: string) => PREFIX + `/stock/{symbol}/earnings`;

	// Time of earnings announcement.
	// BTO - Before open
	// DMT - During trading
	// AMC - After close
	export type TimeofEarnings = 'BTO' | 'DMT' | 'AMC';

	export interface Quarter {
		actualEPS: number,              // Actual earnings per share for the period
		consensusEPS: number,           // Consensus EPS estimate trend for the period
		estimatedEPS: number,           // Earnings per share estimate for the period
		announceTime: TimeofEarnings,   // Time of earnings announcement for the period
		numberOfEstimates: number,      // Number of estimates for the period
		EPSSurpriseDollar: number,      // Dollar amount of EPS surprise for the period
		EPSReportDate: string,          // Expected earnings report date in YYYY-MM-DD format
		fiscalPeriod: string,           // The fiscal quarter the earnings data applies to in Q# YYYY format
		fiscalEndDate: string,          // Date representing the company fiscal quarter end in YYYY-MM-DD format
		yearAgo: number,                // Represents the EPS of the quarter a year ago
		yearAgoChangePercent: number,   // Represents the percent difference between the quarter a year ago actualEPS and current period actualEPS.
		estimatedChangePercent: number, // Represents the percent difference between the quarter a year ago actualEPS and current period estimatedEPS.
		symbolId: number,               // Represents the IEX id for the stock
		[futureProp: string]: any
	}

	export interface Response {
		symbol: string,
		earnings: Quarter[],
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
