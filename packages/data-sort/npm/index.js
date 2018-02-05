
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/data-sort.production.min.js');
} else {
    module.exports = require('./cjs/data-sort.development.js');
}
