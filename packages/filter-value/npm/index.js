
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/filter-value.production.min.js');
} else {
    module.exports = require('./cjs/filter-value.development.js');
}
