/* eslint-disable */
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/sort.production.min.js');
} else {
  module.exports = require('./cjs/sort.development.js');
}