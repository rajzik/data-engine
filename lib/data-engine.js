'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _filter = require('./filter');

var _filter2 = _interopRequireDefault(_filter);

var _sort = require('./sort');

var _sort2 = _interopRequireDefault(_sort);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Data engine providing sort and filter functionality
 *
 * @export
 * @class DataEngine
 */
var DataEngine =
/**
 * Creates an instance of DataEngine.
 * @param {Array} [data=null]
 * @param {string} [primaryKey=null]
 * @param {function} [sortFunction=null]
 *
 * @memberOf DataEngine
 */
function DataEngine() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var primaryKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var sortFunction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  (0, _classCallCheck3.default)(this, DataEngine);

  _initialiseProps.call(this);

  this.data = data;
  this.filter = new _filter2.default(data);
  this.sort = new _sort2.default(data, primaryKey, sortFunction);
}
/**
 * Setter for data
 *
 * @param {Array} new data
 * @return {array} sorted and filtered array
 * @memberOf DataEngine
 */

/**
 * Update filter provider
 *
 * @param {Array} items filter elements
 * @return {array} sorted and filtered array
 * @memberOf DataEngine
 */

/**
 * Update sort provider
 *
 * @param {string} name key which will be sorted on
 * @return {array} sorted and filtered array
 * @memberOf DataEngine
 */

/**
 * Remove filter provider
 *
 * @param {Array} names names which will be removed
 * @return {array} sorted and filtered array
 * @memberOf DataEngine
 */

/**
 * Clearing filters
 *
 *
 * @return {array} sorted and filtered array
 * @memberOf DataEngine
 */

/**
 * Resorting data
 *
 *
 * @return {array} sorted and filtered array
 * @memberOf DataEngine
 */

/**
 * Setting custom sorting function
 *
 * @param {function} new sorting function
 * @memberOf DataEngine
 */

/**
 * Setting default sort function
 *
 *
 * @memberOf DataEngine
 */

/**
 * Setup default sort function
 *
 * @memberOf DataEngine
 */

/**
 * Clearing sort
 *
 * @return {array} sorted and filtered array
 * @memberOf DataEngine
 */

/**
 * Getter for data
 *
 * @return {array} sorted and filtered array
 * @memberOf DataEngine
 */
;

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.setData = function (data) {
    _this.data = _this.sort.updateData(_this.filter.setData(data));
    return _this.data;
  };

  this.updateFilter = function (items) {
    _this.data = _this.sort.updateData(_this.filter.update(items), true);
    return _this.data;
  };

  this.updateSort = function (name) {
    _this.data = _this.sort.sortBy(name);
    return _this.data;
  };

  this.removeFilter = function (names) {
    _this.data = _this.sort.updateData(_this.filter.removeFilter(names), true);
    return _this.data;
  };

  this.clearFilters = function () {
    _this.data = _this.sort.updateData(_this.filter.clearFilters(), true);
    return _this.data;
  };

  this.resort = function () {
    _this.data = _this.sort.justSort();
    return _this.data;
  };

  this.setSortFunction = this.sort.setSortFunction;
  this.setDefaultSort = this.sort.setDefaultSort;
  this.removePrimaryKey = this.sort.removePrimaryKey;
  this.setPrimaryKey = this.sort.setPrimaryKey;

  this.clearSort = function () {
    _this.data = _this.filter.getFilteredData();
    return _this.data;
  };

  this.getData = function () {
    return _this.data;
  };
};

exports.default = DataEngine;