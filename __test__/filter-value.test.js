
import FilterValue from '../build/data-helpers/filter-helpers/filter-value';

const name = 'id';
const newName = 'newId';

const filterValue1 = new FilterValue(name);
// TODO: Add more test
describe('filter value', () => {
    it('should return name', () => {
        expect(filterValue1.getName).toEqual(name);
    });
    it('should change name', () => {
        filterValue1.updateName(newName);
        expect(filterValue1.getName).toEqual(newName);
    });
});
