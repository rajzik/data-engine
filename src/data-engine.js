

import Filter from './filter';
import Sort from './sort';

/**
 * Data engine providing sort and filter functionality
 *
 * @export
 * @class DataEngine
 */
export default class DataEngine {
    /**
     * Creates an instance of DataEngine.
     * @param {Array} [data=null]
     * @param {string} [primaryKey=null]
     * @param {function} [sortFunction=null]
     *
     * @memberOf DataEngine
     */
    constructor(data = null, primaryKey = null, sortFunction = null) {
        this.data = data;
        this.filter = new Filter(data);
        this.sort = new Sort(data, primaryKey, sortFunction);
    }
    /**
     * Setter for data
     *
     * @param {Array} new data
     * @memberOf DataEngine
     */
    setData = (data) => {
        this.data = this.sort.updateData(this.filter.setData(data));
        return this.data;
    }
    /**
     * Update filter provider
     *
     * @param {Array} items filter elements
     * @memberOf DataEngine
     */
    updateFilter = (items) => {
        this.data = this.sort.updateData(this.filter.update(items), true);
        return this.data;
    }
    /**
     * Update sort provider
     *
     * @param {string} name key which will be sorted on
     * @memberOf DataEngine
     */
    updateSort = (name) => {
        this.data = this.sort.sortBy(name);
        return this.data;
    }
    /**
     * Remove filter provider
     *
     * @param {Array} names names which will be removed
     * @memberOf DataEngine
     */
    removeFilter = (names) => {
        this.data = this.sort.updateData(this.filter.removeFilter(names), true);
        return this.data;
    }
    clearFilters = () => {
        this.data = this.sort.updateData(this.filter.clearFilters(), true);
        return this.data;
    }
    clearSort = () => {
        this.data = this.filter.getFilteredData();
        return this.data;
    }
    getData = () => this.data
}
