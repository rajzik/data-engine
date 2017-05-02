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
        this.filter = {};
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
            // Exception when item isn't object!
            if (typeof item !== 'object') {
                throw new TypeError(`${item} isn't object!`);
            }
            // Exception when item isn't FilterValue!
            if (!(item instanceof FilterValue)) {
                throw new TypeError(`${item} has to have filterValue instance`);
            }
            // Exception when item doesn't have name!
            if (typeof item.getName !== 'string') {
                throw new TypeError(`${item.getName()} has to be string`);
            }
            // Setting new element
            this.filter[item.getName] = item;
            returnFunc = this.updateFilter;
        });
        return returnFunc();
    }

    /**
     * Remove one or many filter value
     *
     * @param {object} item - filter item
     *
     * @return {Array} new filtered array
     * @memberOf Filter
     */
    removeFilter = (...names) => {
        let returnFunc = this.getFilteredData;
        names.forEach((name) => {
            const removalName = typeof name === 'string' ? name : name.getName;
            if (this.filter[removalName]) {
                delete this.filter[removalName];
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
        Object.keys(this.filter).forEach((key) => {
            delete this.filter[key];
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
    filterAll = line => Object.keys(this.filter)
        .every(key => this.filter[key].compare(line[key]));
    /**
     * Simple getter
     *
     * @returns {array} filtered data
     *
     * @memberOf Filter
     */
    getFilteredData = () => this.filtered
}

