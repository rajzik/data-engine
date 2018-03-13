
describe('FilterValue', () => {
    let FilterValue;
    beforeEach(() => {
        jest.resetModules();
        FilterValue = require('filter-value');
    });

    it('Should test value', () => {
        const testValue = new FilterValue('test');
        testValue.Value = 'ahoj';
        expect(testValue.compare('ahoj')).toBe(true);
        expect(testValue.compare('nehoj')).toBe(false);
    });
    it('Should test value', () => {
        const testValue = new FilterValue('test');
        testValue.Value = /a/i;
        expect(testValue.compare('ahoj')).toBe(true);
        expect(testValue.compare('nehoj')).toBe(false);
    });
    it('Should test value', () => {
        const testValue = new FilterValue('test');
        testValue.Value = 5;
        expect(testValue.compare(5)).toBe(true);
        expect(testValue.compare('5')).toBe(false);
    });
    it('Should test value', () => {
        const testValue = new FilterValue('test');
        testValue.Value = true;
        expect(testValue.compare(true)).toBe(true);
        expect(testValue.compare('true')).toBe(false);
    });

    it('Should test value', () => {
        const testValue = new FilterValue('test');
        const date = new Date('1999-05-05');
        testValue.Value = date;
        expect(testValue.compare(date)).toBe(true);
        expect(testValue.compare('1999-05-05')).toBe(true);
        expect(testValue.compare('false')).toBe(false);
    });
    it('Should test value', () => {
        const testValue = new FilterValue('test');
        testValue.Value = item => !item;
        expect(testValue.compare(false)).toBe(true);
        expect(testValue.compare(true)).toBe(false);
    });
});
