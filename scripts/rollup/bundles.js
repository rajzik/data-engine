
const bundleTypes = {
    UMD_DEV: 'UMD_DEV',
    UMD_PROD: 'UMD_PROD',
    NODE_DEV: 'NODE_DEV',
    NODE_PROD: 'NODE_PROD',
};


const UMD_DEV = bundleTypes.UMD_DEV;
const UMD_PROD = bundleTypes.UMD_PROD;
const NODE_DEV = bundleTypes.NODE_DEV;
const NODE_PROD = bundleTypes.NODE_PROD;


const babelOptsReact = {
    exclude: 'node_modules/**',
};

const bundles = [
    // Data engine
    {
        babelOpts: babelOptsReact,
        bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
        config: {
            destDir: 'build/',
            moduleName: 'DataEngine',
            sourceMap: false,
        },
        entry: 'src/index.js',
        externals: [
            'data-filter',
            'data-sort',
            'filter-value'
        ],
        name: 'data-engine',
        paths: [
            'src/data-engine.js'
        ],
    },
    // Data filter
    {
        babelOpts: babelOptsReact,
        bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
        config: {
            destDir: 'build/',
            moduleName: 'DataFilter',
            sourceMap: false,
        },
        externals: [
            'filter-value'
        ],
        entry: 'src/data-helpers/data-filter.js',
        name: 'data-filter',
        paths: [],
    },
    // Data sort
    {
        babelOpts: babelOptsReact,
        bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
        config: {
            destDir: 'build/',
            moduleName: 'DataSort',
            sourceMap: false,
        },
        entry: 'src/data-helpers/data-sort.js',
        paths: [],
        name: 'data-sort',
    },
    // Filter value
    {
        babelOpts: babelOptsReact,
        bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
        config: {
            destDir: 'build/',
            moduleName: 'FilterValue',
            sourceMap: false,
        },
        entry: 'src/data-helpers/filter-helpers/filter-value.js',
        paths: [
            'src/data-helpers/filter-helpers/*.js'
        ],
        name: 'filter-value',
    }
];


module.exports = {
    bundleTypes,
    bundles,
};
