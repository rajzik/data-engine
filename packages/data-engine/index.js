/* eslint-disable */
'use strict';

var def;
if (process.env.NODE_ENV === 'production') {
  def = require('./cjs/data-engine.production.min.js')
} else {
  def = require('./cjs/data-engine.development.js');
}  

module.exports['default'] = def.default;
module.exports.FilterValue = def.FilterValue;
module.exports.Filter = def.Filter;
module.exports.Sort = def.Sort;