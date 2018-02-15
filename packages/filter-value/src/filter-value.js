/**
 * @providesModule FilterValue
 */
// eslint-disable-next-line
import { error, warn } from 'shared/log';

import regexpEscape from './regex-escape';

import { types, retype } from './constants/types';
import { checkRangeAbleTypes, validStaticType, checkPrimitiveType } from './helpers';


class FilterValue {
    static regexpEscape = regexpEscape;
    staticType = null;
    /**
     * Creates an instance of FilterValue.
     * string, number, regexp, function, array of items mentioned before
     *
     * @param {string} name - name of filter
     * @param {any} item - value
     * @param {string} type - type of item
     * @memberOf FilterValue
     */
    constructor(name = null, item, type = null) {
        this.originalItem = null;
        this.Name = name;
        if (type !== null) {
            this.Type = type;
        }
        if (item !== undefined) {
            this.Value = item;
        }
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
                error('Multi dimensional array is not supported!');
                throw new TypeError('Multi dimensional array is not supported!');
            }
            return item.map(value => new FilterValue(item.Name, value));
        default:
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
     * Setter for type
     *
     * @param {string} type new static type
     *
     * @memberOf FilterValue
     */
    set Type(type) {
        if (validStaticType(type)) {
            this.staticType = type;
            return;
        }
        this.staticType = null;
        error(`${type} is not supported. Cannot set static type`);
        throw new TypeError(`${type} is not supported`);
    }
    /**
     * Getter for type
     *
     * @returns {string} Static type
     * @memberOf FilterValue
     */
    get Type() {
        return this.staticType;
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
        this.originalItem = item;
        let newItem = item;
        if (this.staticType) {
            try {
                newItem = retype[this.staticType](item);
            } catch (e) {
                error(e);
                throw new Error(`${item} cannot by typed to ${this.staticType}`);
            }
        }
        this.type = this.checkValidity(newItem);

        if (this.type) {
            this.item = this.prepareItem(newItem);
            this.compareFunc = types[this.type](this.item);
        } else {
            error(`${item} is not supported. Use custom function!`);
            warn('Possible types are Date, string, RegExp, number, function, Array<string, RegExp, number, null, function>. Array can have mixed values.');
            throw new TypeError(`${item} is not supported.`);
        }
    }
    /**
     * Getter for original value
     * @returns {any} original item
     */
    get Value() {
        return this.originalItem;
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
     * null, string, number, regexp, function, array of items mentioned before!
     *
     * @param {any} item
     * @return {string|null} return type or null
     * @memberOf FilterValue
     */
    checkValidity = (item) => {
        const type = checkPrimitiveType(item);
        if (type) {
            return type;
        }
        if (item === null) {
            return 'null';
        } else if (Array.isArray(item)) {
            return 'array';
        } else if (item instanceof RegExp) {
            return 'regexp';
        } else if (
            item.from &&
            item.to &&
            checkRangeAbleTypes(item.from) === checkRangeAbleTypes(item.to)
        ) {
            return 'range';
        }
        return null;
    }
}
export default FilterValue;
