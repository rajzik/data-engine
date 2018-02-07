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
     * @param {function} [fetchFunction=null]
     *
     * @memberOf DataEngine
     */
    constructor(data = null, primaryKey = null, sortFunction = null) {
        this.sortEngine = new Sort(data, primaryKey, sortFunction);
        this.filterEngine = new Filter(data, this.sortEngine);
    }
    /**
     * Getter for filter Engine
     * @returns {Filter} instance of our filter
     */
    get FilterEngine() {
        return this.filterEngine;
    }
    /**
     * Getter for sort engine
     * @returns {Sort} instance of our sort
     */
    get SortEngine() {
        return this.sortEngine;
    }
    /**
     * Setter for updating data
     */
    setData = data => this.FilterEngine.setData(data);
    /**
     * Updating filters
     */
    updateFilters = (...items) => this.FilterEngine.update(...items);
    /**
     * Removing filters
     */
    removeFilters = (...items) => this.FilterEngine.removeFilters(...items);
    /**
     * Clearing all filters
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
     * Setter for primary key (fallback key)
     *
     * @param {string} key primary key
     * @memberOf Sort
     */
    setPrimaryKey = key => this.SortEngine.setPrimaryKey(key);
    /**
     * Remover primary key set to default
     *
     *
     * @memberOf Sort
     */
    removePrimaryKey = () => this.SortEngine.removePrimaryKey();
    /**
     * Setup default sort function
     *
     *
     * @memberOf Sort
     */
    setDefaultSort = () => this.SortEngine.setDefaultSort();
    /**
     * sort by name, sets new name and check if we need to only reverse
     *
     * @param {string} name key for sort
     * @memberOf Sort
     */
    sortBy = name => this.SortEngine.sortBy(name);
    /**
     * Well just sort function. when we need resort.
     *
     * @return {Array} sorted data
     * @memberOf Sort
     */
    sortData = () => this.SortEngine.sortData();
    /**
     * well just reverse sorted array
     *
     * @return {Array} reversed data
     * @memberOf Sort
     */
    reverseData = () => this.SortEngine.reverseData();
    /**
     * Getter for data
     *
     * @return {array} sorted and filtered array
     * @memberOf DataEngine
     */
    getData = () => this.FilterEngine.FilteredData;
    get Data() {
        return this.getData();
    }
}


export default DataEngine;
export { FilterValue, Filter, Sort };
