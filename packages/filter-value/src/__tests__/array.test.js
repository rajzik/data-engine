
describe('FilterValue array test', () => {
    let FilterValue;
    beforeEach(() => {
        jest.resetModules();
        FilterValue = require('filter-value');
    });
    it('string array should return true', () => {
        const array = ['a', 'b', 'c', 'd'];
        const a = new FilterValue('test', array);
        expect(a.compare('a')).toBe(true);
    });
    it('string array should return false', () => {
        const array = ['a', 'b', 'c', 'd'];
        const a = new FilterValue('test', array);
        expect(a.compare(['a'])).toBe(false);
    });
    it('Number array should return true', () => {
        const array = [1, 2, 3, 4];
        const a = new FilterValue('test', array);
        expect(a.compare(1)).toBe(true);
    });
    it('Number array should return false', () => {
        const array = [1, 2, 3, 4];
        const a = new FilterValue('test', array);
        expect(a.compare(-1)).toBe(false);
    });
    it('Boolean array should return true', () => {
        const array = [true, false];
        const a = new FilterValue('test', array);
        expect(a.compare(true)).toBe(true);
    });
    it('Boolean array should return false', () => {
        const array = [true, false];
        const a = new FilterValue('test', array);
        expect(a.compare(null)).toBe(false);
    });
    it('Function array should return true', () => {
        const array = [a => a === 'a', a => a === 'b'];
        const a = new FilterValue('test', array);
        expect(a.compare('a')).toBe(true);
    });
    it('Function array should return false', () => {
        const array = [a => a === 'a', a => a === 'b'];
        const a = new FilterValue('test', array);
        expect(a.compare('c')).toBe(false);
    });
    it('Mixed array should return true', () => {
        const array = ['a', 4];
        const a = new FilterValue('test', array);
        expect(a.compare(4)).toBe(true);
    });

    it('Mixed array should return false', () => {
        const array = ['a', 4];
        const a = new FilterValue('test', array);
        expect(a.compare(new Date())).toBe(false);
    });
});
