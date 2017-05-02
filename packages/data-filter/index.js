/* eslint-disable */
'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/data-filter.production.min.js');
} else {
    module.exports = require('./cjs/data-filter.development.js');
}
