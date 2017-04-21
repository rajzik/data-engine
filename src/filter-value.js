import regexEscape from './regex-escape';


export default class FilterValue {
    /**
     * Preparing item for right validation.
     *
     * @static
     * @param {any} item - filter value!
     *
     * @return {Array/any} right element.
     * @memberOf FilterValue
     */
    static prepareItem(item) {
        if (Array.isArray(item)) {
            if (Array.isArray(item[item.length - 1])) {
                throw new TypeError(`${item[item.length]} cannot be Array!`);
            }
            return item.map(i => new FilterValue(item.getName, i));
        }
        return item;
    }
    static regexEscape = regexEscape;
    /**
     * Creates an instance of FilterValue.
     * string, number, regexp, function, array of items mentioned before!
     *
     * @param {string} name - name of filter!
     * @param {any} item - filter value!
     *
     * @memberOf FilterValue
     */
    constructor(name = null, item = null) {
        this.updateName(name);
        if (item === null) {
            return;
        }
        this.updateValue(item);
    }
    /**
     * Setter for name
     *
     * @param {string} name new name
     * @memberOf FilterValue
     */
    updateName = (name) => {
        if (typeof name === 'string') {
            this.name = name;
        }
    }
    /**
     * Getter for name
     *
     * @readonly
     * @return {string} name
     * @memberOf FilterValue
     */
    get getName() {
        return this.name;
    }
    /** Setter for new value
     * Update filter value
     *
     * @param {any} item new item
     * @memberOf FilterValue
     */
    updateValue = (item) => {
        if (this.checkValidity(item)) {
            this.item = FilterValue.prepareItem(item);
        }
        else {
            throw new TypeError('item isn\'t valid filter value, possible types are string, RegExp, number, function, array of types mentioned before.');
        }
    }

    /**
     * Basic exact compare. `===`! for number and strings.
     *
     * @param {any} toCompare - item which will be compared.
     * @return {boolean} compare value
     * @memberOf FilterValue
     */
    basicCompare = toCompare => this.item === toCompare;
    /**
     * Basic regexp test
     *
     * @param {any} toCompare - item which will be compared.
     * @return {boolean} compare value
     *
     * @memberOf FilterValue
     */
    regexpCompare = toCompare => this.item.test(`${toCompare}`);
    /** comparing array of FilterValue!
     *
     * @param {any} toCompare - item which will be compared.
     *
     * @return {boolean} compare value
     * @memberOf FilterValue
     */
    arrayCompare = toCompare => this.item.some(itm => itm.compare(toCompare));
    /**
     * Function compare when user give compare item as function!
     *
     * @param {any} toCompare - item which will be compared.
     *
     * @return {boolean} compare value
     * @memberOf FilterValue
     */
    funcCompare = toCompare => this.item(toCompare);
    /**
     * Basic types of testable items.
     * Enum for data types
     *
     * @memberOf FilterValue
     */
    TYPES = {
        boolean: this.basicCompare,
        string: this.basicCompare,
        number: this.basicCompare,
        array: this.arrayCompare,
        regexp: this.regexpCompare,
        func: this.funcCompare
    };
    /**
     * Applying filter to item which will return true/false. True when it should be ignored.
     *
     * @param {any} toCompare - item which will be compared.
     * @memberOf FilterValue
     */
    compare = toCompare => this.compareFunc(toCompare);
    /**
     * Checking validity of supported types
     * valid types are
     * string, number, regexp, function, array of items mentioned before!
     *
     * @param {any} item
     * @return {boolean} validity of provided item
     *
     * @memberOf FilterValue
     */
    checkValidity = (item) => {
        switch (typeof item) {
        case 'boolean':
            this.compareFunc = this.TYPES.boolean;
            return true;
        case 'string':
            this.compareFunc = this.TYPES.string;
            return true;
        case 'number':
            this.compareFunc = this.TYPES.number;
            return true;
        case 'function':
            this.compareFunc = this.TYPES.func;
            return true;
        case 'object':
            if (Array.isArray(item)) {
                this.compareFunc = this.TYPES.array;
                return true;
            }
            if (item instanceof RegExp) {
                this.compareFunc = this.TYPES.regexp;
                return true;
            }
            return false;
        default:
            return false;
        }
    }
}
