/* eslint-disable */

describe('FilterValue array test', () => {
    let FilterValue;
    beforeEach(() => {
        jest.resetModules();
        FilterValue = require('filter-value');
    });
    it('Should change to time', () => {
        let testValue = new FilterValue();        
        testValue.Type = 'date';
        let dateString = '2002-01-01';
        const date = new Date(dateString);
        testValue.Value = dateString;
        expect(testValue.Value.getTime()).toBe(date.getTime());
    });
    it('Should change to string', () => {
        let testValue = new FilterValue();
        testValue.Type = 'string';
        let val = false;
        testValue.Value = val;
        expect(testValue.Value).toBe(val.toString());
        val = 'test';
        testValue.Value = val;
        expect(testValue.Value).toBe(val.toString());
        val = new Date();
        testValue.Value = val;
        expect(testValue.Value).toBe(val.toString());
        val = undefined;
        testValue.Value = val;
        expect(testValue.Value).toBe(('' + val));
    });
});
