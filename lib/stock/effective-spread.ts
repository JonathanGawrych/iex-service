import { PREFIX } from '../config';

// https://iextrading.com/developer/docs/#effective-spread
/**
 * This returns an array of effective spread, eligible volume, and price improvement of a stock,
 * by market. Unlike volume-by-venue, this will only return a venue if effective spread is not ‘N/A’.
 * Values are sorted in descending order by effectiveSpread. Lower effectiveSpread and higher
 * priceImprovement values are generally considered optimal.
 *
 * Effective spread is designed to measure marketable orders executed in relation to the market
 * center’s quoted spread and takes into account hidden and midpoint liquidity available at each
 * market center. Effective Spread is calculated by using eligible trade prices recorded to the
 * consolidated tape and comparing those trade prices to the National Best Bid and Offer (“NBBO”)
 * at the time of the execution.
 */
export namespace EffectiveSpread {
	export const path = (symbol: string) => PREFIX + `/stock/{symbol}/effective-spread`;

	export interface Response {
		volume: number,            // The eligible shares used for calculating effectiveSpread and priceImprovement
		venue: string,             // The Market Identifier Code (MIC)
		venueName: string,         // A readable version of the venue defined by IEX
		effectiveSpread: number,   // is designed to measure marketable orders executed in relation to the market center’s
		                           // quoted spread and takes into account hidden and midpoint liquidity available at each
		                           // market center in dollars
		effectiveQuoted: number,   // A ratio calculated by dividing a market center’s effective spread by the NBBO quoted spread
		priceImprovement: number,  // The average amount of price improvement in dollars per eligible share executed
		[futureProp: string]: any
	}

	export function get(symbol: string): Promise<Response> {
		return fetch(path(symbol)).then(res => res.json());
	}
}
