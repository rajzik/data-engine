
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
    primaryKey = null;
    direction = true;
    data = [];
    currentName = null;
    /**
     * Creates an instance of Sort.
     * @param {any} data - original data
     * @param {string} [primaryKey=null] - primary key which will be fallback when keys are equals
     * @param {function} [sortFunction=null] - custom sort function
     * @param {boolean} [direction=true] - custom sort function
     *
     * @memberOf Sort
     */
    constructor({
        data,
        primaryKey,
        sortFunction,
        direction,
    } = {}) {
        this.Direction = direction;
        this.sortFunc = this.defaultSort;
        this.SortFunction = sortFunction;
        this.PrimaryKey = primaryKey;
        this.Data = data;
    }
    /**
     * Update data, refresh old data with new.
     *
     * @param {any} data new data
     * @param {boolean} shouldSort should be resorted
     * @memberOf Sort
     */
    setData = (data, shouldSort = true) => {
        if (!Array.isArray(data)) {
            this.data = [];
            return [];
        }
        this.data = data;
        if (shouldSort) {
            this.sortData();
        }
        return this.data;
    }
    set Data(data) {
        this.setData(data);
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
     * Setter for direction
     * @param {boolean} direction of sort
     */
    set Direction(direction) {
        if (typeof direction === 'boolean') this.direction = direction;
        else this.direction = true;
    }
    /**
     * Getter for direction
     * @returns {boolean}
     */
    get Direction() {
        return this.direction;
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
            this.setOwnSortFunction();
        }
    }
    set PrimaryKey(key) {
        this.setPrimaryKey(key);
    }
    /**
     * Getter for primary key
     * @returns {string|null}
     */
    get PrimaryKey() {
        return this.primaryKey;
    }
    /**
     * Remover primary key set to default
     *
     *
     * @memberOf Sort
     */
    removePrimaryKey = () => {
        this.primaryKey = null;
        this.setOwnSortFunction();
    }
    /**
     * Setup default sort function
     *
     *
     * @memberOf Sort
     */
    setDefaultSort = () => {
        this.isCustomFunction = false;
        this.setOwnSortFunction();
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
        return (((first > second) === this.direction) ? 1 : -1);
    }
    /**
     * Compare by current name
     *
     * @param {any} a - first item
     * @param {any} b - second item
     * @return {number} position of elements
     * @memberOf Sort
     */
    compare = (a, b) => {
        const first = a[this.currentName];
        const second = b[this.currentName];
        if (first === second) return 0;
        return (((first > second) === this.direction) ? 1 : -1);
    }
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
        this.currentName = name;
        this.setOwnSortFunction();
        return this.sortData();
    };
    /**
     * Setting right function for sort,
     * @private
     */
    setOwnSortFunction = () => {
        const { isCustomFunction, primaryKey, currentName, } = this;
        if (isCustomFunction) {
            return;
        }
        if (primaryKey !== null && primaryKey !== currentName) {
            this.sortFunc = this.defaultSortWithKey;
        } else {
            this.sortFunc = this.defaultSort;
        }
    }
    /**
     * default sort with key
     * Default sorting function when user won't add own function.
     * @private
     * @param {any} a - first item
     * @param {any} b - second item
     * @return {number} position of elements
     * @memberOf Sort
     */
    defaultSortWithKey = (a, b) => {
        const first = a[this.currentName];
        const second = b[this.currentName];
        if (first === second) {
            return this.comparePrimaryKey(a, b);
        }
        return (((first > second) === this.direction) ? 1 : -1);
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
    getData = () => this.Data;
    get Data() {
        return this.data;
    }
}
