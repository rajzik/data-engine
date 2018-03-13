
describe('FilterValue', () => {
    let FilterValue;
    beforeEach(() => {
        jest.resetModules();
        FilterValue = require('filter-value');
    });

    it('Should throw type error', () => {
        const testValue = new FilterValue('test');
        expect(() => {
            testValue.Value = [[]];
        }).toThrow();
    });
    it('should throw on type error', () => {
        const testValue = new FilterValue();
        expect(() => {
            testValue.Type = 'Not work';
        }).toThrow();
    });
    it('should throw on type error', () => {
        const testValue = new FilterValue();
        expect(() => {
            testValue.Value = { a: { b: {}, }, };
        }).toThrow();
    });
    it('should throw on type error', () => {
        const testValue = new FilterValue();
        testValue.Type = 'date';
        expect(() => {
            testValue.Value = ['Hello'];
        }).toThrow();
    });
});
