'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

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

/**
 * Setter for custom function
 *
 * @param {function} func your custom sort function
 * @memberOf Sort
 */

/**
 * Setter for primary key (fallback key)
 *
 * @param {string} key primary key
 * @memberOf Sort
 */

/**
 * Remover primary key set to default
 *
 *
 * @memberOf Sort
 */

/**
 * Setup default sort function
 *
 *
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
 * sort by name, sets new name and check if we need to only reverse
 *
 * @param {string} name key for sort
 * @memberOf Sort
 */

/**
 * default sort with key
 * Default sorting function when user won't add own function.
 *
 * @param {any} a - first item
 * @param {any} b - second item
 * @return {number} position of elements
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

/**
 * Getter for data
 *
 *
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

    this.setSortFunction = function (func) {
        if (typeof func === 'function') {
            _this.sortFunc = func;
            _this.isCustomFunction = true;
        }
    };

    this.setPrimaryKey = function (key) {
        if (typeof key === 'string') {
            _this.primaryKey = key;
            if (!_this.isCustomFunction) {
                _this.sortFunc = _this.defaultSortWithKey;
            }
        }
    };

    this.removePrimaryKey = function () {
        _this.primaryKey = '';
        if (!_this.isCustomFunction) {
            _this.sortFunc = _this.defaultSort;
        }
    };

    this.setDefaultSort = function () {
        _this.isCustomFunction = false;
        _this.sortFunc = _this.primaryKey ? _this.defaultSortWithKey : _this.defaultSort;
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

    this.defaultSortWithKey = function (a, b) {
        if (a[_this.currentName] === b[_this.currentName]) {
            return _this.sortDefault(a, b);
        }
        return _this.compare(a, b);
    };

    this.defaultSort = function (a, b) {
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

    this.getData = function () {
        return _this.data;
    };
};

exports.default = Sort;