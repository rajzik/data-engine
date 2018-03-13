
describe('Sort', () => {
    let Sort;
    beforeEach(() => {
        jest.resetModules();
        Sort = require('data-sort');
    });


    it('Change primaryKey', () => {
        const sort = new Sort();
        sort.PrimaryKey = 'b';
        expect(sort.PrimaryKey).toBe('b');
        sort.PrimaryKey = 'a';
        expect(sort.PrimaryKey).toBe('a');
        sort.removePrimaryKey();
        expect(sort.PrimaryKey).toBe(null);
    });

    it('Change function', () => {
        const sort = new Sort();
        const func = (a, b) => (a > b ? -1 : 1);
        sort.SortFunction = func;
        expect(sort.sortFunc(2, 1)).toEqual(-1);
        sort.setDefaultSort();
        sort.sortBy('a');
        expect(sort.sortFunc({ a: 2, }, { a: 1, })).toEqual(1);
    });

    it('Change direction', () => {
        const sort = new Sort();
        sort.Direction = false;
        expect(sort.Direction).toBe(false);
    });
});
