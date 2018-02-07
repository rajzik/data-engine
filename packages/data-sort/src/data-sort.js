
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
    constructor(data = [], primaryKey = null, sortFunction = null) {
        this.currentName = null;
        this.sortFunc = this.defaultSort;
        this.setSortFunction(sortFunction);
        this.setPrimaryKey(primaryKey);
        this.setData(data);
    }
    /**
     * Update data, refresh old data with new.
     *
     * @param {any} data new data
     * @param {boolean} shouldSort should be resorted
     * @memberOf Sort
     */
    setData = (data, shouldSort = true) => {
        this.data = data;
        if (shouldSort) {
            return this.sortData();
        }
        return this.data;
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
    set SortFunction(func) {
        this.setSortFunction(func);
    }
    /**
     * Setter for primary key (fallback key)
     *
     * @param {string} key primary key
     * @memberOf Sort
     */
    setPrimaryKey = (key) => {
        if (this.isCustomFunction) {
            return;
        }
        if (typeof key === 'string' && key.length > 0) {
            this.primaryKey = key;
            if (this.currentName === null) {
                this.currentName = key;
            }
            this.setSortFunction();
        }
    }
    set PrimaryKey(key) {
        this.setPrimaryKey(key);
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
            this.setSortFunction();
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
        this.setSortFunction();
    }
    /**
     * Compare primary key
     * Fallback function when current values are equal.
     * @param {any} a - first item
     * @param {any} b - second item
     * @return {number} position of elements
     * @memberOf Sort
     */
    comparePrimaryKey = (a, b) => {
        const first = a[this.primaryKey];
        const second = b[this.primaryKey];
        if (first === second) return 0;
        return (first > second ? 1 : -1);
    }
    /**
     * Compare by current name
     *
     * @param {any} a - first item
     * @param {any} b - second item
     * @return {number} position of elements
     * @memberOf Sort
     */
    compare = (a, b) => (a[this.currentName] > b[this.currentName] ? 1 : -1);
    /**
     * sort by name, sets new name and check if we need to only reverse
     *
     * @param {string} name key for sort
     * @memberOf Sort
     */
    sortBy = (name) => {
        if (this.currentName === name) {
            return this.reverseData();
        }
        this.setSortFunction();
        this.currentName = name;
        return this.sortData();
    };
    /**
     * Setting right function for sort,
     *
     */
    setSortFunction = () => {
        if (this.isCustomFunction) {
            return;
        }
        if (this.currentName === this.primaryKey) {
            this.sortFunc = this.defaultSort;
        } else {
            this.sortFunc = this.defaultSortWithKey;
        }
    }
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
            return this.comparePrimaryKey(a, b);
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
            this.data = this.data.sort(this.sortFunc);
        }
        return this.data;
    }
    /**
     * well just reverse sorted array
     *
     * @return {Array} reversed data
     * @memberOf Sort
     */
    reverseData = () => {
        this.data = this.data.reverse();
        return this.data;
    }
    /**
     * Getter for data
     *
     *
     * @memberOf Sort
     */
    getData = () => this.data;
}
