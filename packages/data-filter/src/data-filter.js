/**
 * @providesModule Filter
 */

import FilterValue from 'filter-value';
import Sort from 'data-sort';

/**
 * Filter engine
 *
 * @class Filter
 */
export default class Filter {
    static FilterValue = FilterValue;
    static Sort = Sort;
    updateFce = this.filterWOSort;
    data = [];
    filtered = [];
    sortEngine = null;
    /**
     * Creates an instance of Filter.
     * @param {any} data - initial data
     *
     * @memberOf Filter
     */
    constructor({ data, sortEngine, } = {}) {
        this.filters = {};
        this.SortEngine = sortEngine;
        this.Data = data;
        this.filtered = this.Data;
    }
    /**
     * Setter for data
     *
     * @param {Array} data - original data
     * @memberOf Filter
     */
    setData = (data) => {
        this.Data = data;
    }
    set Data(data) {
        if (data && Array.isArray(data)) {
            this.data = data;
            this.updateFilter();
        }
        this.data = [];
        this.filtered = [];
    }
    /**
     * Setter for data
     * @return {Array<any>} original data
     * @memberOf Filter
     */
    get Data() {
        return this.data;
    }
    /**
     * Helper function for creating new filterValue
     * @private
     * @param {string} name - name of collumn
     * @param {any} value - value of filter
     * @param {string} type - static type for value
     * @returns {FilterValue} new filter value
     */
    createFilter = (name, value, type) => new FilterValue(name, value, type);
    /**
     * Simple add filter function
     * @param {string} name - name of collumn
     * @param {any} value - value of filter
     * @param {string} type - static type for value
     * @return {Array<any>} filtered array
     */
    addFilter = (name, value, type) => this.update(this.createFilter(name, value, type))
    /**
     * Add or modify filter value
     *
     *
     * @param {Array<FilterValue>} items - array of filter items
     * @throws {TypeError} when item isn't instance of FilterValue
     * @return {Array} new filtered array
     * @memberOf Filter
     */
    update = (...items) => {
        let returnFunc = this.getFilteredData;
        items.forEach((item) => {
            // Exception when item isn't filterValue!
            if (!(item instanceof FilterValue)) {
                throw new TypeError(`${item} has to have filterValue instance`);
            }
            this.filters[item.Name] = item;
            returnFunc = this.updateFilter;
        });
        return returnFunc();
    }
    /**
     * Remove one or as many filters as you add value
     * only updating when at least one filter was removed
     *
     * @param {Array<string | FilterValue>} item - filter item
     *
     * @return {Array<any>} new filtered array
     * @memberOf Filter
     */
    removeFilters = (...names) => {
        let returnFunc = this.getFilteredData;
        names.forEach((item) => {
            const removalName = typeof item === 'string' ? item : item.Name;
            if (this.filters[removalName]) {
                delete this.filters[removalName];
                returnFunc = this.updateFilter;
            }
        });
        return returnFunc();
    }
    /**
     * Clears all filters,
     * it's possible that sort is still active so we need to filter anyway
     *
     * @return {Array<any>} new filtered array
     * @memberOf Filter
     */
    clearFilters = () => {
        this.filters = {};
        this.updateFilter();
        return this.FilteredData;
    }
    /**
     * Update filtered array.
     *
     * @return {Array} new filtered array
     * @memberOf Filter
     */
    updateFilter = () => {
        this.filtered = this.updateFce(this.data.filter(this.filterAll));
        return this.FilteredData;
    }

    /**
     * Filter line by all criteria.
     * Helper function for filtering.
     * @private
     * @param {object} line - line from original data.
     * @return {bool}
     * @memberOf Filter
     */
    filterAll = line => Object.keys(this.filters)
        .every(key => this.filters[key].compare(line[key]));
    /**
     * Simple getter
     *
     * @returns {array} filtered data
     *
     * @memberOf Filter
     */
    getFilteredData = () => this.FilteredData;
    get FilteredData() {
        return this.filtered;
    }
    /**
     * Helper function when sort is not in filter
     * filtering without sort
     * @private
     * @return {Array<any>} filtered data
     */
    filterWOSort = data => data
    /**
     * Helper function with sort
     * Filtering with sort
     * @private
     * @return {Array<any>} filtered and sorted array
     */
    filterWSort = data => this.SortEngine.setData(data)
    /**
     * Getter for filter
     * @param {string} name - name of filter
     * @returns {FilterValue | null} return filter value
     */
    getFilter = (name) => {
        if (this.filters[name]) {
            return this.filters[name];
        }
        return null;
    }
    /**
     * Setter for sort engine
     * @param {Sort} sortEngine - instance of Sort
     */
    set SortEngine(sortEngine) {
        if (sortEngine instanceof Sort) {
            this.sortEngine = sortEngine;
            this.updateFce = this.filterWSort;
        } else {
            this.sortEngine = null;
            this.updateFce = this.filterWOSort;
        }
    }
    /**
     * Getter for sort engine
     * @returns {Sort} - instance of Sort
     */
    get SortEngine() {
        return this.sortEngine;
    }
}

