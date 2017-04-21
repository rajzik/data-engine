
import FilterValue from '../src/filter-value';

const name = 'id';

const filterValue1 = new FilterValue(name);
// TODO: Add more test
describe('filter value', () => {
    it('should return name', () => {
        expect(filterValue1.getName).toEqual(name);
    });
});
