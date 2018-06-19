import { PREFIX } from '../config';
// https://iextrading.com/developer/docs/#symbols
export namespace Symbols {
	export const path = () => PREFIX + `/ref-data/symbols`;

	// The common issue type
	// AD - ADR
	// RE - REIT
	// CE - Closed end fund
	// SI - Secondary Issue
	// LP - Limited Partnerships
	// CS - Common Stock
	// ET - ETF
	export type Type = 'AD' | 'RE' | 'CE' | 'SI' | 'LP' | 'CS' | 'ET';

	export interface Response {
		symbol: string,           // The symbol represented in Nasdaq Integrated symbology (INET).
		name: string,             // The name of the company or security.
		date: string,             // The date the symbol reference data was generated.
		isEnabled: boolean,       // If the symbol is enabled for trading on IEX.
		type: Type,               // The common issue type
		iexId: string,            // Unique ID applied by IEX to track securities through symbol changes.
		[futureProp: string]: any
	}

	export function get(): Promise<Response[]> {
		return fetch(path()).then(res => res.json());
	}
}