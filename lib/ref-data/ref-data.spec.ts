import * as fetchMock from 'fetch-mock';
import * as RefData from './index';

describe('RefData', () => {
	afterEach(() => {
		fetchMock.restore();
	});

	it('should have all the apis', () => {
		expect(RefData.Symbols).toBeDefined();
		// expect(RefData.CorporateActions).toBeDefined();
		// expect(RefData.Dividends).toBeDefined();
		// expect(RefData.NextDayExDate).toBeDefined();
		// expect(RefData.SymbolDirectory).toBeDefined();
	});

	it('should be able to get the symbols', (done) => {
		fetchMock.mock(RefData.Symbols.path(), []);
		RefData.Symbols.get().then((symbols) => {
			expect(symbols).toEqual([]);
			done();
		});
	});
});

