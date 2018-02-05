

const path = require('path');

const babel = require('babel-core');


const pathToBabelPluginAsyncToGenerator = require.resolve('babel-plugin-transform-async-to-generator');

const babelOptions = {
    plugins: [
    // For Node environment only. For builds, Rollup takes care of ESM.
        require.resolve('babel-plugin-transform-es2015-modules-commonjs')
    ],
    retainLines: true,
};

module.exports = {
    process(src, filePath) {
        if (!filePath.match(/\/third_party\//)) {
            // for test files, we also apply the async-await transform, but we want to
            // make sure we don't accidentally apply that transform to product code.
            const isTestFile = !!filePath.match(/\/__tests__\//);
            return babel.transform(
                src,
                Object.assign(
                    { filename: path.relative(process.cwd(), filePath), },
                    babelOptions,
                    isTestFile
                        ? {
                            plugins: [pathToBabelPluginAsyncToGenerator]
                                .concat(babelOptions.plugins),
                        }
                        : {}
                )
            ).code;
        }
        return src;
    },

};
