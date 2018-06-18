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

	it('should be able to get a list without query parameters', (done) => {
		fetchMock.mock(Stock.List.path('mostactive'), []);
		Stock.List.get('mostactive').then((quotes) => {
			expect(quotes).toEqual([]);
			done();
		})
	});

	it('should be able to get a list with query parameters', (done) => {
		fetchMock.mock(Stock.List.path('mostactive') + '?displayPercent=true', []);
		Stock.List.get('mostactive', {displayPercent: true}).then((quotes) => {
			expect(quotes).toEqual([]);
			done();
		})
	});

	let expectedChart: Stock.Chart.Response = {
		high: 143.98,
		low: 143.775,
		volume: 3070,
		label: "09:30 AM",
		changeOverTime: -0.0039,
		date: "20171215",
		open: 143.98,
		close: 143.775
	};

	let expectedOneDayChart = {
		...expectedChart,
		minute: "09:30",
		marketAverage: 143.889,
		marketNotional: 441740.275,
		marketNumberOfTrades: 20,
		marktOpen: 143.98,
		marketClose: 143.775,
		marktHigh: 143.98,
		marketLow: 143.775,
		marketVolume: 3070,
		marketChangeOverTime: -0.004,
		average: 143.889,
		notional: 441740.275,
		numberOfTrades: 20
	};

	it('should be able to call chart with just a symbol', (done) => {
		fetchMock.mock(Stock.Chart.path('APPL', '1m'), [expectedChart]);
		Stock.Chart.get('APPL').then((chart) => {
			expect(chart).toEqual([expectedChart]);
			done();
		})
	});

	it('should be able to call chart with a symbol and range', (done) => {
		fetchMock.mock(Stock.Chart.path('APPL', '3m'), [expectedChart]);
		Stock.Chart.get('APPL', '3m').then((chart) => {
			expect(chart).toEqual([expectedChart]);
			done();
		})
	});

	it('should be able to call chart with a symbol, range, and empty params', (done) => {
		let params: Stock.Chart.Request = {}; // params are optional

		fetchMock.mock(Stock.Chart.path('APPL', '3m') + '?', [expectedChart]);
		Stock.Chart.get('APPL', '3m', params).then((chart) => {
			expect(chart).toEqual([expectedChart]);
			done();
		})
	});

	it('should be able to call chart with a symbol, range, and params', (done) => {
		let params: Stock.Chart.Request = {
			chartInterval: 1,
			changeFromClose: true,
			chartLast: 2
		};
		let paramString = '?chartInterval=1&changeFromClose=true&chartLast=2';

		fetchMock.mock(Stock.Chart.path('APPL', '3m') + paramString, [expectedChart]);
		Stock.Chart.get('APPL', '3m', params).then((chart) => {
			expect(chart).toEqual([expectedChart]);
			done();
		})
	});

	it('should be able to call a one day chart with one day params', (done) => {
		let params: Stock.Chart.OneDay.Request = {
			chartReset: true
		};
		let paramString = '?chartReset=true';

		fetchMock.mock(Stock.Chart.path('APPL', '3m') + paramString, [expectedOneDayChart]);
		Stock.Chart.get('APPL', '3m', params).then((chart) => {
			expect(chart).toEqual([expectedOneDayChart]);
			done();
		})
	});
});

