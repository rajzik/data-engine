/**
 * @providesModule DataEngine
 */


import Filter from 'data-filter';
import Sort from 'data-sort';
import FilterValue from 'filter-value';
/**
 * Data engine providing sort and filter functionality
 *
 * @export
 * @class DataEngine
 */
class DataEngine {
    static Filter = Filter;
    static Sort = Sort;
    static FilterValue = FilterValue;
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
     * @return {array} sorted and filtered array
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
     * @return {array} sorted and filtered array
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
     * @return {array} sorted and filtered array
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
     * @return {array} sorted and filtered array
     * @memberOf DataEngine
     */
    removeFilter = (names) => {
        this.data = this.sort.updateData(this.filter.removeFilter(names), true);
        return this.data;
    }
    /**
     * Clearing filters
     *
     *
     * @return {array} sorted and filtered array
     * @memberOf DataEngine
     */
    clearFilters = () => {
        this.data = this.sort.updateData(this.filter.clearFilters(), true);
        return this.data;
    }
    /**
     * Resorting data
     *
     *
     * @return {array} sorted and filtered array
     * @memberOf DataEngine
     */
    resort = () => {
        this.data = this.sort.justSort();
        return this.data;
    }
    /**
     * Setting custom sorting function
     *
     * @param {function} new sorting function
     * @memberOf DataEngine
     */
    setSortFunction = func => this.sort.setSortFunction(func);
    /**
     * Setting default sort function
     *
     *
     * @memberOf DataEngine
     */
    setDefaultSort = () => this.sort.setDefaultSort();
    /**
     * Setup default sort function
     *
     * @memberOf DataEngine
     */
    removePrimaryKey = () => this.sort.removePrimaryKey();
    /**
     * Setter for primary key
     *
     * @param {string} primary key
     * @memberOf DataEngine
     */
    setPrimaryKey = primaryKey => this.sort.setPrimaryKey(primaryKey);
    /**
     * Clearing sort
     *
     * @return {array} sorted and filtered array
     * @memberOf DataEngine
     */
    clearSort = () => {
        this.data = this.filter.getFilteredData();
        return this.data;
    }
    /**
     * Getter for data
     *
     * @return {array} sorted and filtered array
     * @memberOf DataEngine
     */
    getData = () => this.data;
}


export default DataEngine;
export { FilterValue, Filter, Sort };
