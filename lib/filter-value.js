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

var _regexEscape = require('./regex-escape');

var _regexEscape2 = _interopRequireDefault(_regexEscape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterValue = function () {
    (0, _createClass3.default)(FilterValue, null, [{
        key: 'prepareItem',

        /**
         * Preparing item for right validation.
         *
         * @static
         * @param {any} item - filter value!
         *
         * @return {Array/any} right element.
         * @memberOf FilterValue
         */
        value: function prepareItem(item) {
            if (Array.isArray(item)) {
                if (Array.isArray(item[item.length - 1])) {
                    throw new TypeError(item[item.length] + ' cannot be Array!');
                }
                return item.map(function (i) {
                    return new FilterValue(item.getName, i);
                });
            }
            return item;
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
        (0, _classCallCheck3.default)(this, FilterValue);

        _initialiseProps.call(this);

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
         * Basic types of testable items.
         * Enum for data types
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
         * @return {boolean} validity of provided item
         *
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

    this.updateValue = function (item) {
        if (_this.checkValidity(item)) {
            _this.item = FilterValue.prepareItem(item);
        } else {
            throw new TypeError('item isn\'t valid filter value, possible types are string, RegExp, number, function, array of types mentioned before.');
        }
    };

    this.basicCompare = function (toCompare) {
        return _this.item === toCompare;
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

    this.TYPES = {
        boolean: this.basicCompare,
        string: this.basicCompare,
        number: this.basicCompare,
        array: this.arrayCompare,
        regexp: this.regexpCompare,
        func: this.funcCompare
    };

    this.compare = function (toCompare) {
        return _this.compareFunc(toCompare);
    };

    this.checkValidity = function (item) {
        switch (typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item)) {
            case 'boolean':
                _this.compareFunc = _this.TYPES.boolean;
                return true;
            case 'string':
                _this.compareFunc = _this.TYPES.string;
                return true;
            case 'number':
                _this.compareFunc = _this.TYPES.number;
                return true;
            case 'function':
                _this.compareFunc = _this.TYPES.func;
                return true;
            case 'object':
                if (Array.isArray(item)) {
                    _this.compareFunc = _this.TYPES.array;
                    return true;
                }
                if (item instanceof RegExp) {
                    _this.compareFunc = _this.TYPES.regexp;
                    return true;
                }
                return false;
            default:
                return false;
        }
    };
};

exports.default = FilterValue;