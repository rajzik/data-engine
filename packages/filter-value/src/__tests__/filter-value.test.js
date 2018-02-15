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
        const name = 'Name';
        const newName = 'New Name';

        let testValue = new FilterValue(name);
        expect(testValue.Name).toBe(name); 
        testValue.Name = newName;
        expect(testValue.Name).toBe(newName);
    });
    it('Create FilterValue with value', () => {
        let testValue = new FilterValue(null, 'Test');
        expect(testValue.Value).toBe('Test'); 
        testValue.Value = 4;
        expect(testValue.Value).toBe(4);
        testValue.Value = /test/;
        expect(testValue.Value).toBeInstanceOf(RegExp); 
    });
    
    it('Create FilterValue with Type', () => {
        const retype = [
            'number',
            'string',
            'boolean',
            'regexp',
            'date'
        ];
        let testValue = new FilterValue(null, undefined, 'string');
        retype.forEach((item) => {
            testValue.Type = item;
            expect(testValue.Type).toBe(item);        
        });
        testValue.removeType();
        expect(testValue.Type).toBe(null);
    });

    
});
