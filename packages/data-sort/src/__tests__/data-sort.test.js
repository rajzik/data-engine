/* eslint-disable */

describe('Sort', () => {
    let Sort;
    beforeEach(() => {
        jest.resetModules();
        Sort = require('data-sort');
    });
    it('Create Sort object', () => {
        let sort = new Sort();
        expect(sort).toBeInstanceOf(Sort);
    });
    it('Create Sort object', () => {
        let sort = new Sort({ sortFunction: (a, b) => (a > b? 1 : -1), direction: true});
        expect(sort.Direction).toBe(true);
        expect(sort.PrimaryKey).toBe(null);
        expect(sort.SortFunction).not.toBeNull();
    });

    
});
