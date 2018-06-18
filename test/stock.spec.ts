import * as fetchMock from 'fetch-mock';
import { Stock } from '../lib';

describe('Stock', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	it('should have all the apis', () => {
		// expect(Stock.batch).toBeDefined();
		// expect(Stock.book).toBeDefined();
		expect(Stock.Chart).toBeDefined();
		expect(Stock.Company).toBeDefined();
		expect(Stock.DelayedQuote).toBeDefined();
		expect(Stock.Dividends).toBeDefined();
		expect(Stock.Earnings).toBeDefined();
		expect(Stock.EffectiveSpread).toBeDefined();
		expect(Stock.Financials).toBeDefined();
		expect(Stock.LargestTrades).toBeDefined();
		expect(Stock.List).toBeDefined();
		expect(Stock.Logo).toBeDefined();
		expect(Stock.News).toBeDefined();
		expect(Stock.OHLC).toBeDefined();
		expect(Stock.Peers).toBeDefined();
		expect(Stock.Previous).toBeDefined();
		expect(Stock.Price).toBeDefined();
		expect(Stock.Quote).toBeDefined();
		expect(Stock.Relevant).toBeDefined();
		// expect(Stock.shortInterest).toBeDefined();
		expect(Stock.Splits).toBeDefined();
		expect(Stock.Stats).toBeDefined();
		// expect(Stock.thresholdSecurities).toBeDefined();
		expect(Stock.TimeSeries).toBeDefined();
		expect(Stock.VolumeByVenue).toBeDefined();
	});

	it('should be able to get the price', (done) => {
		fetchMock.mock(Stock.Price.path('MSFT'), '100');
		Stock.Price.get('MSFT').then((price) => {
			expect(price).toBe(100);
			done();
		});
	});
});

