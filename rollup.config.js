const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');


export default {
    entry: 'src/index.js',
    dest: 'lib/index.min.js',
    format: 'umd',
    moduleName: 'DataEngine',
    plugins: [
        babel({
            exclude: 'node_modules/**',
        }),
        uglify()
    ]
};
