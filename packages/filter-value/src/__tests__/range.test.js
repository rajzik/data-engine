
describe('FilterValue array test', () => {
    let FilterValue;
    beforeEach(() => {
        jest.resetModules();
        FilterValue = require('filter-value');
    });
    it('Range should return true', () => {
        const item = { from: 20, to: 30, };
        const a = new FilterValue('test', item);
        expect(a.compare(20)).toBe(true);
    });
    it('Range should return true', () => {
        const item = { from: 20, to: 30, };
        const a = new FilterValue('test', item);
        expect(a.compare(2)).toBe(false);
    });
    it('Range should return true', () => {
        const item = { from: 'aaaa', to: 'bbbb', };
        const a = new FilterValue('test', item);
        expect(a.compare('aabb')).toBe(true);
    });
    it('Range should return false', () => {
        const item = { from: 'aaaa', to: 'bbbb', };
        const a = new FilterValue('test', item);
        expect(a.compare('aaxx')).toBe(true);
    });
    it('Range should return true', () => {
        const item = { from: new Date(0), to: new Date(1000), };
        const a = new FilterValue('test', item);
        expect(a.compare(new Date(10))).toBe(true);
    });
    it('Range should return false', () => {
        const item = { from: new Date(100000), to: new Date(1000001), };
        const a = new FilterValue('test', item);
        expect(a.compare(new Date(10000000))).toBe(false);
    });
    it('Range should return false', () => {
        const item = { from: new Date(100000), to: new Date(1000001), };
        const a = new FilterValue('test', item);
        expect(a.compare('2000-06-12')).toBe(false);
    });
});
