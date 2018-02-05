
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./cjs/data-engine.production.min.js');
} else {
    module.exports = require('./cjs/data-engine.development.js');
}
