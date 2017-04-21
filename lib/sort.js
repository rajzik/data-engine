"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sort engine, just basic sort provider
 *
 * @export
 * @class Sort
 */
var Sort =
/**
 * Creates an instance of Sort.
 * @param {any} data - original data
 * @param {string} [primaryKey=null] - primary key which will be fallback when keys are equals
 * @param {function} [sortFunction=null] - custom sort function
 *
 * @memberOf Sort
 */
function Sort(data) {
    var primaryKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var sortFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    (0, _classCallCheck3.default)(this, Sort);

    _initialiseProps.call(this);

    this.data = data;
    this.sortDefault = function () {};
    this.primaryKey = primaryKey;
    if (this.primaryKey) {
        this.sortDefault = this.comparePrimaryKey;
    }
    this.sortFunc = this.defaultSort;
    if (sortFunction) {
        this.sortFunc = sortFunction;
    }
}
/**
 * Update data, refresh old data with new.
 *
 * @param {any} data new data
 * @param {boolean} shouldSort should be resorted
 * @memberOf Sort
 */

/**
 * Compare primary key
 * Fallback function when current values are equal.
 * @param {any} a - first item
 * @param {any} b - second item
 * @return {number} position of elements
 * @memberOf Sort
 */

/**
 * Compare by current name
 *
 * @param {any} a - first item
 * @param {any} b - second item
 * @return {number} position of elements
 * @memberOf Sort
 */

/**
 * sort by name, sets new name and check if we need to only revese
 *
 * @param {string} name key for sort
 * @memberOf Sort
 */

/**
 * default sort
 * Default sorting function when user won't add own function.
 *
 * @param {any} a - first item
 * @param {any} b - second item
 * @return {number} position of elements
 * @memberOf Sort
 */

/**
 * Well just sort function. when we need resort.
 *
 * @return {Array} sorted data
 * @memberOf Sort
 */

/**
 * well just reverse sorted array
 *
 * @return {Array} reversed data
 * @memberOf Sort
 */
;

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.updateData = function (data) {
        var shouldSort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        _this.data = data;
        if (shouldSort) {
            return _this.justSort();
        }
        _this.currentName = null;

        return data;
    };

    this.comparePrimaryKey = function (a, b) {
        return a[_this.primaryKey] > b[_this.primaryKey];
    };

    this.compare = function (a, b) {
        return a[_this.currentName] > b[_this.currentName];
    };

    this.sortBy = function (name) {
        if (_this.currentName === name) {
            return _this.justReverse();
        }
        _this.currentName = name;
        return _this.justSort();
    };

    this.defaultSort = function (a, b) {
        if (a[_this.currentName] === b[_this.currentName]) {
            return _this.sortDefault(a, b);
        }
        return _this.compare(a, b);
    };

    this.justSort = function () {
        if (_this.currentName) {
            return _this.data.sort(_this.sortFunc);
        }
        return _this.data;
    };

    this.justReverse = function () {
        return _this.data.reverse();
    };
};

exports.default = Sort;