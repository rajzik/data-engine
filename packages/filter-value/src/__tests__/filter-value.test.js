/* eslint-disable */

describe('FilterValue', () => {
    let FilterValue;
    beforeEach(() => {
        jest.resetModules();
        FilterValue = require('filter-value');
    });
    it('Create FilterValue object', () => {
        let testValue = new FilterValue();
        expect(testValue).toBeInstanceOf(FilterValue);        
    });
    it('Create FilterValue with name', () => {
        let testValue = new FilterValue('Name');
        expect(testValue.Name).toBe('Name'); 
    });
    it('Create FilterValue with value', () => {
        let testValue = new FilterValue(null, 'Test');
        expect(testValue.Value).toBe('Test'); 
    });
    it('Create FilterValue with Type', () => {
        let testValue = new FilterValue(null, undefined, 'string');
        expect(testValue.Type).toBe('string');
    });
    
});
