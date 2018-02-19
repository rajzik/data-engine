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

    it('Should change to Regexp', () => {
        let testValue = new FilterValue();
        testValue.Type = 'regexp';
        let val = false;
        testValue.Value = val;
        expect(testValue.Value).toEqual(new RegExp(val, 'i'));
        val = 'test';
        testValue.Value = val;
        expect(testValue.Value).toEqual(new RegExp(val, 'i'));
    });
    it('Should change to boolean', () => {
        let testValue = new FilterValue();
        testValue.Type = 'boolean';
        let val = false;
        testValue.Value = val;
        expect(testValue.Value).toEqual(val);
        val = 'test';
        testValue.Value = val;
        expect(testValue.Value).toEqual(true);
        val = '';
        testValue.Value = val;
        expect(testValue.Value).toEqual(false);
        val = undefined;
        testValue.Value = val;
        expect(testValue.Value).toEqual(false);
    });
    it('Should change to boolean', () => {
        let testValue = new FilterValue();
        testValue.Type = 'number';
        let val = false;
        testValue.Value = val;
        expect(testValue.Value).toEqual(parseFloat(val));
        val = '4';
        testValue.Value = val;
        expect(testValue.Value).toEqual(4);
        val = '';
        testValue.Value = val;
        expect(testValue.Value).toBeNaN();
        val = undefined;
        testValue.Value = val;
        expect(testValue.Value).toBeNaN();
    });
});
