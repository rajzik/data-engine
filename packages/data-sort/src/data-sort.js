
/**
 * @providesModule Sort
 */


/**
 * Sort engine, just basic sort provider
 *
 * @export
 * @class Sort
 */
export default class Sort {
    /**
     * Creates an instance of Sort.
     * @param {any} data - original data
     * @param {string} [primaryKey=null] - primary key which will be fallback when keys are equals
     * @param {function} [sortFunction=null] - custom sort function
     *
     * @memberOf Sort
     */
    constructor(data, primaryKey = null, sortFunction = null) {
        this.data = data;
        this.sortDefault = () => {};
        this.setPrimaryKey(primaryKey);
        this.sortFunc = this.defaultSort;
        this.setSortFunction(sortFunction);
    }
    /**
     * Update data, refresh old data with new.
     *
     * @param {any} data new data
     * @param {boolean} shouldSort should be resorted
     * @memberOf Sort
     */
    updateData = (data, shouldSort = false) => {
        this.data = data;
        if (shouldSort) {
            return this.sortData();
        }
        this.currentName = null;

        return data;
    }
    /**
     * Setter for custom function
     *
     * @param {function} func your custom sort function
     * @memberOf Sort
     */
    setSortFunction = (func) => {
        if (typeof func === 'function') {
            this.sortFunc = func;
            this.isCustomFunction = true;
        }
    }
    /**
     * Setter for primary key (fallback key)
     *
     * @param {string} key primary key
     * @memberOf Sort
     */
    setPrimaryKey = (key) => {
        if (typeof key === 'string') {
            this.primaryKey = key;
            if (!this.isCustomFunction) {
                this.sortFunc = this.defaultSortWithKey;
            }
        }
    }
    /**
     * Remover primary key set to default
     *
     *
     * @memberOf Sort
     */
    removePrimaryKey = () => {
        this.primaryKey = '';
        if (!this.isCustomFunction) {
            this.sortFunc = this.defaultSort;
        }
    }
    /**
     * Setup default sort function
     *
     *
     * @memberOf Sort
     */
    setDefaultSort = () => {
        this.isCustomFunction = false;
        this.sortFunc = this.primaryKey ? this.defaultSortWithKey : this.defaultSort;
    }
    /**
     * Compare primary key
     * Fallback function when current values are equal.
     * @param {any} a - first item
     * @param {any} b - second item
     * @return {number} position of elements
     * @memberOf Sort
     */
    comparePrimaryKey = (a, b) => a[this.primaryKey] > b[this.primaryKey]
    /**
     * Compare by current name
     *
     * @param {any} a - first item
     * @param {any} b - second item
     * @return {number} position of elements
     * @memberOf Sort
     */
    compare = (a, b) => a[this.currentName] > b[this.currentName]
    /**
     * sort by name, sets new name and check if we need to only reverse
     *
     * @param {string} name key for sort
     * @memberOf Sort
     */
    sortBy = (name) => {
        if (this.currentName === name) {
            return this.justReverse();
        }
        this.currentName = name;
        return this.justSort();
    };
    /**
     * default sort with key
     * Default sorting function when user won't add own function.
     *
     * @param {any} a - first item
     * @param {any} b - second item
     * @return {number} position of elements
     * @memberOf Sort
     */
    defaultSortWithKey = (a, b) => {
        if (a[this.currentName] === b[this.currentName]) {
            return this.sortDefault(a, b);
        }
        return this.compare(a, b);
    }
    /**
     * default sort
     * Default sorting function when user won't add own function.
     *
     * @param {any} a - first item
     * @param {any} b - second item
     * @return {number} position of elements
     * @memberOf Sort
     */
    defaultSort = (a, b) => this.compare(a, b)
    /**
     * Well just sort function. when we need resort.
     *
     * @return {Array} sorted data
     * @memberOf Sort
     */
    sortData = () => {
        if (this.currentName) {
            return this.data.sort(this.sortFunc);
        }
        return this.data;
    }
    /**
     * well just reverse sorted array
     *
     * @return {Array} reversed data
     * @memberOf Sort
     */
    reverseData = () => this.data.reverse();
    /**
     * Getter for data
     *
     *
     * @memberOf Sort
     */
    getData = () => this.data;
}
