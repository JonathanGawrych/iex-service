import { PREFIX } from '../config';

// https://iextrading.com/developer/docs/#volume-by-venue
/**
 * This returns 15 minute delayed and 30 day average consolidated volume percentage
 * of a stock, by market. This call will always return 13 values, and will be sorted
 * in ascending order by current day trading volume percentage.
 */
export namespace VolumeByVenue {
	export const path = (symbol: string) => PREFIX + `/stock/{symbol}/volume-by-venue`;

	export interface Response {
		volume: number,           // The current day, 15 minute delayed volume
		venue: string,            // The Market Identifier Code (MIC)
		venueName: string,        // A readable version of the venue defined by IEX
		date: string,             // The date the data was last updated in the format YYYY-MM-DD
		marketPercent: number,    // The 15 minute delayed percent of total stock volume traded by the venue
		avgMarketPercent: number, // The 30 day average percent of total stock volume traded by the venue
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
