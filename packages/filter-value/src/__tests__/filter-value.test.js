/* eslint-disable */

describe('FilterValue', () => {
    let FilterValue;
    beforeEach(() => {
        jest.resetModules();
        FilterValue = require('filter-value');
    });
    it('should create object', () => {
        console.log(FilterValue);
        let testValue = new FilterValue();
        expect(testValue).toBeInstanceOf(FilterValue);

    });

});
