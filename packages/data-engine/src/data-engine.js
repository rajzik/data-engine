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
    constructor({
        data, primaryKey, sortFunction, direction,
    } = {}) {
        this.filterEngine = new Filter({
            data,
            sortEngine: new Sort({
                data, primaryKey, sortFunction, direction,
            }),
        });
    }
    /**
     * Getter for filter Engine
     * @returns {Filter} instance of filter
     */
    get FilterEngine() {
        return this.filterEngine;
    }
    /**
     * Getter for sort engine
     * @returns {Sort} instance of sort
     */
    get SortEngine() {
        return this.filterEngine.SortEngine;
    }
    /**
     * Setter for updating data
     * @param {Array<any>} data - original data
     */
    set Data(data) {
        this.setData(data);
    }
    setData = (data) => {
        this.filterEngine.Data = data;
    }
    /**
     * @see data-filter
     */
    updateFilters = (...items) => this.FilterEngine.update(...items);
    /**
     * @see data-filter
     */
    removeFilters = (...items) => this.FilterEngine.removeFilters(...items);
    /**
     * @see data-filter
     */
    addFilter = (name, value, type) => this.FilterEngine.addFilter(name, value, type);
    /**
     * @see data-filter
     */
    clearFilters = () => this.FilterEngine.clearFilters();
    /**
     * Setter for custom function
     *
     * @param {function} func your custom sort function
     * @memberOf Sort
     */
    setSortFunction = func => this.SortEngine.setSortFunction(func);
    /**
     * @see data-sort
     */
    setPrimaryKey = key => this.SortEngine.setPrimaryKey(key);
    /**
     * @see data-sort
     */
    removePrimaryKey = () => this.SortEngine.removePrimaryKey();
    /**
     * @see data-sort
     */
    setDefaultSort = () => this.SortEngine.setDefaultSort();
    /**
     * @see data-sort
     */
    sortBy = name => this.SortEngine.sortBy(name);
    /**
     * Getter for filtered data
     *
     * @return {array} sorted and filtered array
     * @memberOf DataEngine
     */
    getData = () => this.Data;
    get Data() {
        return this.FilterEngine.FilteredData;
    }
}

export default DataEngine;
