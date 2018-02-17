/* eslint-disable */

describe('regexpEscape', () => {
    let regexpEscape;
    beforeEach(() => {
        jest.resetModules();
        regexpEscape = require('filter-value').regexpEscape;
    });
    
    it('Should export regexpEscape', () => {
        expect(regexpEscape).not.toBeUndefined();
    });
    
});
