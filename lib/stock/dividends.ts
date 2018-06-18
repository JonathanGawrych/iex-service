import { PREFIX } from 'config';
import { RangeOption } from './range'

// https://iextrading.com/developer/docs/#dividends
export namespace Dividends {
	export const path = (symbol: string, range: RangeOption) => PREFIX + `/stock/{symbol}/dividends/{range}`;

	// The dividend flag
	// FI = Final dividend, div ends or instrument ends,
	// LI = Liquidation, instrument liquidates,
	// PR = Proceeds of a sale of rights or shares,
	// RE = Redemption of rights,
	// AC = Accrued dividend,
	// AR = Payment in arrears,
	// AD = Additional payment,
	// EX = Extra payment,
	// SP = Special dividend,
	// YE = Year end,
	// UR = Unknown rate,
	// SU = Regular dividend is suspended)
	export type FlagType = 'FI' | 'LI' | 'PR' | 'RE' | 'AC' | 'AR' | 'AD' | 'EX' | 'SP' | 'YE' | 'UR' | 'SU';

	// The dividend payment type
	export type PaymentType = 'Dividend income'
	                        | 'Interest income'
	                        | 'Stock dividend'
	                        | 'Short term capital gain'
	                        | 'Medium term capital gain'
	                        | 'Long term capital gain'
	                        | 'Unspecified term capital gain'

	// The dividend income type
	// P = Partially qualified income
	// Q = Qualified income
	// N = Unqualified income
	// null = N/A or unknown
	export type QualifiedType = 'P' | 'Q' | 'N' | null;

	export interface Response {
		exDate: string,           // The dividend ex-date
		paymentDate: string,      // The payment date
		recordDate: string,       // The dividend record date
		declaredDate: string,     // The dividend declaration date
		amount: number,           // The payment amount
		flag: FlagType,           // The dividend flag
		type: PaymentType,        // The dividend payment type
		qualified: QualifiedType, // The dividend income type
		indicated: number,        // The indicated rate of the dividend
		[futureProp: string]: any
	}

	export function get(symbol: string, range: RangeOption = '1m'): Promise<Response> {
		return fetch(path(symbol, range)).then(res => res.json());
	}
}
