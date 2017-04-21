
import Filter from '../src/filter';
import FilterValue from '../src/filter-value';
import { originalData, data1 } from './data';
// TODO: Add more test

const filter = new Filter(originalData);
const filterValue = new FilterValue('id', 1);

describe('Filter', () => {
    it('Should found only one item', () => {
        expect(filter.update(filterValue)).toEqual(data1);
    });
    it('Should reset array', () => {
        expect(filter.clearFilters()).toEqual(originalData);
    });
});
