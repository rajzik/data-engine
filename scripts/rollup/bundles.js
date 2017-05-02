
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
  /** ***** Main *******/
    {
        babelOpts: babelOptsReact,
        bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
        config: {
            destDir: 'build/',
            moduleName: 'DataEngine',
            sourceMap: false,
        },
        entry: 'src/index.js',
        hasteName: 'DataEngine',
        paths: [
            'src/data-helpers/**/*.js',
            'src/data-engine.js'
        ],
        name: 'data-engine',
    },
    {
        babelOpts: babelOptsReact,
        bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
        config: {
            destDir: 'build/',
            moduleName: 'Filter',
            sourceMap: false,
        },
        entry: 'src/data-helpers/filter.js',
        name: 'filter',
        paths: [
            'src/data-helpers/filter-helpers/**/*.js'
        ],
    },
    {
        babelOpts: babelOptsReact,
        bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
        config: {
            destDir: 'build/',
            moduleName: 'Sort',
            sourceMap: false,
        },
        entry: 'src/data-helpers/sort.js',
        paths: [],
        name: 'sort',
    },
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
