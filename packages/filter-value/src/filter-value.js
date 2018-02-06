/**
 * @providesModule FilterValue
 */

import './update-prototype';
import regexEscape from './regex-escape';

const staticTypes = ['number', 'string', 'regexp', 'boolean'];

// TODO: check static types

export default class FilterValue {
    static regexEscape = regexEscape;
    /**
     * Creates an instance of FilterValue.
     * string, number, regexp, function, array of items mentioned before
     *
     * @param {string} name - name of filter
     * @param {any} item - value
     * @param {any} type - type of item
     * @memberOf FilterValue
     */
    constructor(name = null, item = null, type = null) {
        this.originaItem = null;
        this.Name = name;
        if (type !== null) {
            this.Type = type;
        }
        if (item === null) {
            return;
        }
        this.Value = item;
    }
    /**
     * Preparing item for right validation.
     *
     * @param {any} item - filter value!
     *
     * @return {Array/any} right element.
     * @memberOf FilterValue
     */
    prepareItem(item) {
        switch (this.type) {
        case 'array':
            if (Array.isArray(item[item.length - 1])) {
                throw new TypeError('Array in Array isn\'t supported!');
            }
            return item.map(value => new FilterValue(item.Name, value));
        default:
            if (this.staticType) {
                return this.RETYPE[this.staticType](item);
            }
            return item;
        }
    }
    /**
     * Setter for name
     *
     * @param {string} name new name
     * @memberOf FilterValue
     */
    set Name(name) {
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
    get Name() {
        return this.name;
    }
    /**
     * Validation if possible to static type item
     * @param {any} item
     * @return {boolean} true when it's possible to retype
     * @memberOf FilterValue
     */
    validStaticType = item => staticTypes.some(key => key === item);
    /**
     * Setter for type
     *
     * @param {string} type new static type
     *
     * @memberOf FilterValue
     */
    set Type(type) {
        if (this.validStaticType(type)) {
            this.staticType = type;
        }
    }
    /**
     * Remove static Type
     *
     *
     * @memberOf FilterValue
     */
    removeType = () => {
        this.staticType = null;
    }

    /** Setter for new value
     * Update filter value
     *
     * @param {any} item new item
     * @memberOf FilterValue
     */
    set Value(item) {
        this.originaItem = item;
        this.type = this.checkValidity(item);

        if (this.type) {
            this.item = this.prepareItem(item);
            this.compareFunc = this.TYPES[this.type];
        } else {
            throw new TypeError('item isn\'t valid filter value, possible types are string, RegExp, number, function, array of types mentioned before.');
        }
    }
    /**
     * Getter for original value
     */
    get Value() {
        return this.originaItem;
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
     * Compares dates
     * @see ./update-prototype
     *
     * @param {Date}
     * @memberOf FilterValue
     */
    dateCompare = toCompare => this.item.$.compare(toCompare);
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
     * Compares range
     * @see ./update-prototype
     *
     * @param {any} toCompare item which will be compared
     * @memberOf FilterValue
     */
    rangeCompare = toCompare =>
        this.item.from.$.isLess(toCompare)
        && this.item.to.$.isGreater(toCompare);
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
        date: this.dateCompare,
        array: this.arrayCompare,
        regexp: this.regexpCompare,
        func: this.funcCompare,
        range: this.rangeCompare,
    };
    /**
     * Try to retype to number
     *
     * @param {any} item which should be retyped
     * @return {number} retyped number
     * @memberOf FilterValue
     */
    numberRetype = item => parseFloat(item);
    /**
     * Retype anything to string
     *
     * @param {any} item which should be retyped
     * @return {string} retyped string
     * @memberOf FilterValue
     */
    stringRetype = item => `${item}`;
    /**
     * Retype anything to bool
     *
     * @param {any} item which should be retyped
     * @return {bool} retyped bool
     * @memberOf FilterValue
     */
    booleanRetype = item => !!item;
    /**
     * Enum for retype
     *
     *
     * @memberOf FilterValue
     */
    RETYPE = {
        number: this.numberRetype,
        string: this.stringRetype,
        boolean: this.booleanRetype,
    }
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
     * @return {string/null} return type if exist
     * @memberOf FilterValue
     */
    checkValidity = (item) => {
        let type = this.checkRangeAbleTypes(item);
        if (!type) {
            switch (typeof item) {
            case 'boolean':
                type = 'boolean';
                break;
            case 'function':
                type = 'func';
                break;
            case 'object':
                if (Array.isArray(item)) {
                    type = 'array';
                } else if (item instanceof RegExp) {
                    type = 'regexp';
                } else if (item.from && item.to) {
                    if (this.checkRangeAbleTypes(item.from) === this.checkRangeAbleTypes(item.to)) {
                        type = 'range';
                    }
                }
                break;
            default:
                break;
            }
        }
        return type;
    }
    /**
     * checkBasicTypes checking basic types
     *
     * @param {any} item
     * @return {string/null} name of type if exist
     * @memberOf FilterValue
     */
    checkRangeAbleTypes = (item) => {
        let type = null;
        switch (typeof item) {
        case 'string':
            type = 'string';
            break;
        case 'number':
            type = 'number';
            break;
        case 'object':
            if (item instanceof Date) {
                type = 'date';
            }
            break;
        default:
            break;
        }
        return type;
    }
}

