
import Sort from '../src/sort';
import { sort, sortDone } from './data';
// TODO: Add more test

const sorter = new Sort(sort);

describe('sort', () => {
    it('should sort data', () => {
        expect(sorter.sortBy('id')).toEqual(sortDone);
    });
});
