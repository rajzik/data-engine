
describe('regexpEscape', () => {
    let rEscape;
    beforeEach(() => {
        jest.resetModules();
        rEscape = require('filter-value').regexpEscape;
    });

    it('Should export regexpEscape', () => {
        expect(rEscape).not.toBeUndefined();
    });
});
