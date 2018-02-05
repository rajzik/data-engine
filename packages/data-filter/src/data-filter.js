/**
 * @providesModule Filter
 */

import FilterValue from 'filter-value';

/**
 * Filter engine
 *
 * @class Filter
 */
export default class Filter {
    /**
     * Creates an instance of Filter.
     * @param {any} data - initial data
     *
     * @memberOf Filter
     */
    constructor(data = null) {
        this.data = data;
        this.filtered = data;
        this.filters = {};
    }
    /**
     * Setter for data
     *
     * @param {Array} data new data
     * @memberOf Filter
     */
    setData = (data) => {
        this.data = data;
        return this.updateFilter();
    }
    /**
     * Add or modify filter value
     *
     *
     * @param {Array} items - array of filter items
     * @throws {TypeError} when item isn't object
     * @throws {TypeError} when item isn't instance of FilterValue
     * @return {Array} new filtered array
     * @memberOf Filter
     */
    update = (...items) => {
        let returnFunc = this.getFilteredData;
        items.forEach((item) => {
            // Exception when item isn't filterValue!
            if (!((typeof item === 'object') && (item instanceof FilterValue))) {
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
     * @param {object} item - filter item
     *
     * @return {Array} new filtered array
     * @memberOf Filter
     */
    removeFilter = (...names) => {
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
     * Clears all filters
     *
     * @return {Array} new filtered array
     * @memberOf Filter
     */
    clearFilters = () => {
        Object.keys(this.filters).forEach((key) => {
            delete this.filters[key];
        });
        this.filtered = this.data;
        return this.filtered;
    }
    /**
     * Update filtered array.
     *
     * @return {Array} new filtered array
     * @memberOf Filter
     */
    updateFilter = () => {
        if (this.data === null) {
            throw new Error('Data are null and cannot be filtered!');
        }
        this.filtered = this.data.filter(this.filterAll);
        return this.filtered;
    }
    /**
     * Filter line by all criteria.
     *
     * @param {object} line - line from original data.
     *
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
    getFilteredData = () => this.filtered;
    /**
     * Getter for filter
     * @returns {any} anything you pass to filterValue
     */
    getFilter(name) {
        if (this.filters[name]) {
            return this.filters[name];
        }
        return null;
    }
}

