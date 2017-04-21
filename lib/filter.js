'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _filterValue = require('./filter-value');

var _filterValue2 = _interopRequireDefault(_filterValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Filter engine
 *
 * @class Filter
 */
var Filter =
/**
 * Creates an instance of Filter.
 * @param {any} data - initial data
 *
 * @memberOf Filter
 */
function Filter() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    (0, _classCallCheck3.default)(this, Filter);

    _initialiseProps.call(this);

    this.data = data;
    this.filtered = data;
    this.filter = {};
}
/**
 * Setter for data
 *
 * @param {Array} data new data
 * @memberOf Filter
 */

/**
 * Add or modify filter value
 *
 *
 * @param {Array} items - array of filter items
 * @throws {TypeError} when item isn't object
 * @throws {TypeError} when item isn't instance of FilterValue
 * @return {Array} new filtered array
 * @memberOf Filter
 */


/**
 * Remove one or many filter value
 *
 * @param {object} item - filter item
 *
 * @return {Array} new filtered array
 * @memberOf Filter
 */

/**
 * Clears all filters
 *
 * @return {Array} new filtered array
 * @memberOf Filter
 */

/**
 * Update filtered array.
 *
 * @return {Array} new filtered array
 * @memberOf Filter
 */

/**
 * Filter line by all criteria.
 *
 * @param {object} line - line from original data.
 *
 * @return {bool}
 * @memberOf Filter
 */

/**
 * Simple getter
 *
 * @returns {array} filtered data
 *
 * @memberOf Filter
 */
;

var _initialiseProps = function _initialiseProps() {
    var _this = this;

    this.setData = function (data) {
        _this.data = data;
        return _this.updateFilter();
    };

    this.update = function () {
        for (var _len = arguments.length, items = Array(_len), _key = 0; _key < _len; _key++) {
            items[_key] = arguments[_key];
        }

        var returnFunc = _this.getFilteredData;
        items.forEach(function (item) {
            // Exception when item isn't object!
            if ((typeof item === 'undefined' ? 'undefined' : (0, _typeof3.default)(item)) !== 'object') {
                throw new TypeError(item + ' isn\'t object!');
            }
            // Exception when item isn't FilterValue!
            if (!(item instanceof _filterValue2.default)) {
                throw new TypeError(item + ' has to have filterValue instance');
            }
            // Exception when item doesn't have name!
            if (typeof item.getName !== 'string') {
                throw new TypeError(item.getName() + ' has to be string');
            }
            // Setting new element
            _this.filter[item.getName] = item;
            returnFunc = _this.updateFilter;
        });
        return returnFunc();
    };

    this.removeFilter = function () {
        for (var _len2 = arguments.length, names = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            names[_key2] = arguments[_key2];
        }

        var returnFunc = _this.getFilteredData;
        names.forEach(function (name) {
            var removalName = typeof name === 'string' ? name : name.getName;
            if (_this.filter[removalName]) {
                delete _this.filter[removalName];
                returnFunc = _this.updateFilter;
            }
        });
        return returnFunc();
    };

    this.clearFilters = function () {
        (0, _keys2.default)(_this.filter).forEach(function (key) {
            delete _this.filter[key];
        });
        _this.filtered = _this.data;
        return _this.filtered;
    };

    this.updateFilter = function () {
        if (_this.data === null) {
            throw new Error('Data are null cannot filter!');
        }
        _this.filtered = _this.data.filter(_this.filterAll);
        return _this.filtered;
    };

    this.filterAll = function (line) {
        return (0, _keys2.default)(_this.filter).every(function (key) {
            return _this.filter[key].compare(line[key]);
        });
    };

    this.getFilteredData = function () {
        return _this.filtered;
    };
};

exports.default = Filter;