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
        
    });
});
