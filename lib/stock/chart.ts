import { PREFIX } from 'config';
import { RangeOption } from './range';

// https://iextrading.com/developer/docs/#chart
export namespace Chart {
	/**
	 * 5y -      Five years -    Historically adjusted market-wide data
	 * 2y -      Two years -     Historically adjusted market-wide data
	 * 1y -      One year -      Historically adjusted market-wide data
	 * ytd -     Year-to-date -  Historically adjusted market-wide data
	 * 6m -      Six months -    Historically adjusted market-wide data
	 * 3m -      Three months -  Historically adjusted market-wide data
	 * 1m -      One month -     Historically adjusted market-wide data (default)
	 * 1d -      One day -       IEX-only data by minute
	 * date -    Specific date - IEX-only data by minute for a specified date in the format YYYYMMDD if available. Currently supporting trailing 30 calendar days.
	 * dynamic - One day -       Will return 1d or 1m data depending on the day or week and time of day. Intraday per minute data is only returned during market hours.
	 */
	export type ChartRanges = RangeOption | '1d' | 'date' | 'dynamic';

	export const path = (symbol: string, ChartRanges: string) => PREFIX + `/stock/{symbol}/chart/{range}`;

	export interface Request {
		chartInterval: number,    // If passed, chart data will return every Nth element as defined by chartInterval
		changeFromClose: boolean, // If true, changeOverTime and marketChangeOverTime will be relative to previous day close instead of the first value.
		chartLast: number         // If passed, chart data will return the last N elements
	}

	export interface Response {
		high: number,             //
		low: number,              //
		volume: number,           //
		label: number,            // A variable formatted version of the date depending on the range. Optional convienience field.
		changeOverTime: number,   // Percent change of each interval relative to first value. Useful for comparing multiple stocks.
		date: string,             //
		open: number,             //
		close: number,            //
		[futureProp: string]: any
	}

	export namespace OneDay {
		export interface Request extends Chart.Request {
			chartReset: boolean, // If true, 1d chart will reset at midnight instead of the default behavior of 9:30am ET.
		}

		export interface Response extends Chart.Response {
			minute: string,               //
			marketAverage: number,        // 15 minute delayed
			marketNotional: number,       // 15 minute delayed
			marketNumberOfTrades: number, // 15 minute delayed
			marketOpen: number,           // 15 minute delayed
			marketClose: number,          // 15 minute delayed
			marketHigh: number,           // 15 minute delayed
			marketLow: number,            // 15 minute delayed
			marketVolume: number,         // 15 minute delayed
			marketChangeOverTime: number, // Percent change of each interval relative to first value. 15 minute delayed
			average: number,              //
			notional: number,             //
			numberOfTrades: number,       //
		}

		export namespace Simplify {
			export interface Request extends Chart.OneDay.Request {
				chartSimplify: boolean, // If true, runs a polyline simplification using the Douglas-Peucker algorithm. This is useful if plotting sparkline charts
			}

			export interface SimplifyFactor {
				[0]: number, // The original number of points.
				[1]: number  // How many remain after simplification.
			}

			export interface Response extends Chart.OneDay.Response {
				simplifyFactor: SimplifyFactor
			}
		}
	}

	export namespace MultiDay {
		export interface Response extends Chart.Response {
			unadjustedVolume: number,
			change: number,
			changePercent: number,
			vwap: number
		}
	}

	type AnyRequest = Request
	                | OneDay.Request
	                | OneDay.Simplify.Request;
	type AnyResponse = Promise<Response[]>
	                 | Promise<OneDay.Response[]>
	                 | Promise<OneDay.Simplify.Response[]>
	                 | Promise<MultiDay.Response[]>;

	// Possible overload list
	export function get(symbol: string, range: ChartRanges, params?: Request): Promise<Response[]>;
	export function get(symbol: string, range: '1d', params?: OneDay.Request): Promise<OneDay.Response[]>;
	export function get(symbol: string, range: '1d', params?: OneDay.Simplify.Request): Promise<OneDay.Simplify.Response[]>;
	export function get(symbol: string, range: Exclude<ChartRanges, '1d'>, params?: Request): Promise<MultiDay.Response[]>;
	export function get(symbol: string, range: 'date', params: Request, date: string): Promise<MultiDay.Response[]>;

	// Overloaded real function
	export function get(symbol: string, range: ChartRanges = '1m', params?: AnyRequest, date?: string): AnyResponse {
		let url = path(symbol, range);
		if (range == 'date') {
			url += '/' + date!;
		}

		if (params != null) {
			// @ts-ignore - see https://github.com/Microsoft/TypeScript/issues/15338
			url += '?' + new URLSearchParams(params);
		}

		return fetch(url).then(res => res.json());
	}
}
