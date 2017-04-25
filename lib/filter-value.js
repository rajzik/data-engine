'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

require('./update-prototype');

var _regexEscape = require('./regex-escape');

var _regexEscape2 = _interopRequireDefault(_regexEscape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var staticTypes = ['number', 'string', 'regexp', 'boolean'];

// TODO: check static types

var FilterValue = function () {
    (0, _createClass3.default)(FilterValue, [{
        key: 'prepareItem',

        /**
         * Preparing item for right validation.
         *
         * @param {any} item - filter value!
         *
         * @return {Array/any} right element.
         * @memberOf FilterValue
         */
        value: function prepareItem(item) {
            switch (this.type) {
                case 'array':
                    if (Array.isArray(item[item.length - 1])) {
                        throw new TypeError('Array in Array isn\'t supported!');
                    }
                    return item.map(function (i) {
                        return new FilterValue(item.getName, i);
                    });
                default:
                    if (this.staticType) {
                        return this.RETYPE[this.staticType](item);
                    }
                    return item;
            }
        }
    }]);

    /**
     * Creates an instance of FilterValue.
     * string, number, regexp, function, array of items mentioned before!
     *
     * @param {string} name - name of filter!
     * @param {any} item - filter value!
     *
     * @memberOf FilterValue
     */
    function FilterValue() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var item = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        (0, _classCallCheck3.default)(this, FilterValue);

        _initialiseProps.call(this);

        this.updateName(name);
        if (type !== null) {
            this.updateType(type);
        }
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

    /**
     * Setter for type
     *
     * @param {string} type new static type
     *
     * @memberOf FilterValue
     */

    /**
     * Remove static Type
     *
     *
     * @memberOf FilterValue
     */


    (0, _createClass3.default)(FilterValue, [{
        key: 'getName',

        /**
         * Getter for name
         *
         * @readonly
         * @return {string} name
         * @memberOf FilterValue
         */
        get: function get() {
            return this.name;
        }
        /** Setter for new value
         * Update filter value
         *
         * @param {any} item new item
         * @memberOf FilterValue
         */


        /**
         * Basic exact compare. `===`! for number and strings.
         *
         * @param {any} toCompare - item which will be compared.
         * @return {boolean} compare value
         * @memberOf FilterValue
         */

        /**
          * Compares dates
          * @see ./update-prototype
          *
          * @param {Date}
          * @memberOf FilterValue
          */

        /**
         * Basic regexp test
         *
         * @param {any} toCompare - item which will be compared.
         * @return {boolean} compare value
         *
         * @memberOf FilterValue
         */

        /** comparing array of FilterValue!
         *
         * @param {any} toCompare - item which will be compared.
         *
         * @return {boolean} compare value
         * @memberOf FilterValue
         */

        /**
         * Function compare when user give compare item as function!
         *
         * @param {any} toCompare - item which will be compared.
         *
         * @return {boolean} compare value
         * @memberOf FilterValue
         */


        /**
         * Compares range
         * @see ./update-prototype
         *
         * @param {any} toCompare item which will be compared
         * @memberOf FilterValue
         */

        /**
         * Basic types of testable items.
         * Enum for data types
         *
         * @memberOf FilterValue
         */

        /**
         * Try to retype to number
         *
         * @param {any} item which should be retyped
         * @return {number} retyped number
         * @memberOf FilterValue
         */

        /**
         * Retype anything to string
         *
         * @param {any} item which should be retyped
         * @return {string} retyped string
         * @memberOf FilterValue
         */

        /**
         * Retype anything to regex
         *
         * @param {any} item which should be retyped
         * @return {Regexp} retyped Regexp
         * @memberOf FilterValue
         */

        /**
         * Retype anything to bool
         *
         * @param {any} item which should be retyped
         * @return {bool} retyped bool
         * @memberOf FilterValue
         */

        /**
         * Enum for retype
         *
         *
         * @memberOf FilterValue
         */

        /**
         * Applying filter to item which will return true/false. True when it should be ignored.
         *
         * @param {any} toCompare - item which will be compared.
         * @memberOf FilterValue
         */

        /**
         * Checking validity of supported types
         * valid types are
         * string, number, regexp, function, array of items mentioned before!
         *
         * @param {any} item
         * @return {string/null} return type if exist
         * @memberOf FilterValue
         */

        /**
         * checkBasicTypes checking basic types
         *
         * @param {any} item
         * @return {string/null} name of type if exist
         * @memberOf FilterValue
         */

    }]);
    return FilterValue;
}();

FilterValue.regexEscape = _regexEscape2.default;

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.updateName = function (name) {
        if (typeof name === 'string') {
            _this.name = name;
        }
    };

    this.validStaticType = function (item) {
        return staticTypes.some(function (key) {
            return key === item;
        });
    };

    this.updateType = function (type) {
        if (_this.validStaticType(type)) {
            _this.staticType = type;
        }
    };

    this.removeType = function () {
        _this.staticType = null;
    };

    this.updateValue = function (item) {
        _this.type = _this.checkValidity(item);

        if (_this.type) {
            _this.item = _this.prepareItem(item);
            _this.compareFunc = _this.TYPES[_this.type];
        } else {
            throw new TypeError('item isn\'t valid filter value, possible types are string, RegExp, number, function, array of types mentioned before.');
        }
    };

    this.basicCompare = function (toCompare) {
        return _this.item === toCompare;
    };

    this.dateCompare = function (toCompare) {
        return _this.item.$.compare(toCompare);
    };

    this.regexpCompare = function (toCompare) {
        return _this.item.test('' + toCompare);
    };

    this.arrayCompare = function (toCompare) {
        return _this.item.some(function (itm) {
            return itm.compare(toCompare);
        });
    };

    this.funcCompare = function (toCompare) {
        return _this.item(toCompare);
    };

    this.rangeCompare = function (toCompare) {
        return _this.item.from.$.isLess(toCompare) && _this.item.to.$.isGreater(toCompare);
    };

    this.TYPES = {
        boolean: this.basicCompare,
        string: this.basicCompare,
        number: this.basicCompare,
        date: this.dateCompare,
        array: this.arrayCompare,
        regexp: this.regexpCompare,
        func: this.funcCompare,
        range: this.rangeCompare
    };

    this.numberRetype = function (item) {
        return parseFloat(item);
    };

    this.stringRetype = function (item) {
        return '' + item;
    };

    this.regexpRetype = function (item) {
        return new RegExp('' + FilterValue.regexEscape(item));
    };

    this.booleanRetype = function (item) {
        return !!item;
    };

    this.RETYPE = {
        number: this.numberRetype,
        string: this.stringRetype,
        regexp: this.regexpRetype,
        boolean: this.booleanRetype
    };

    this.compare = function (toCompare) {
        return _this.compareFunc(toCompare);
    };

    this.checkValidity = function (item) {
        var type = _this.checkRangeAbleTypes(item);
        if (!type) {
            switch (typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item)) {
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
                        if (_this.checkRangeAbleTypes(item.from) === _this.checkRangeAbleTypes(item.to)) {
                            type = 'range';
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        return type;
    };

    this.checkRangeAbleTypes = function (item) {
        var type = null;
        switch (typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item)) {
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
    };
};

exports.default = FilterValue;