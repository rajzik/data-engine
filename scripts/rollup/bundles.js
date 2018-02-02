

const bundleTypes = {
    UMD_DEV: 'UMD_DEV',
    UMD_PROD: 'UMD_PROD',
    NODE_DEV: 'NODE_DEV',
    NODE_PROD: 'NODE_PROD',
};

const {
    UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD,
} = bundleTypes;


const bundles = [
    /** ****** Main Engine ******* */
    {
        label: 'data-engine',
        bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
        moduleType: 'ISOMORPHIC',
        entry: 'data-engine',
        global: 'DataEngine',
        externals: [],
    },
    /** ******* Filter component ******* */
    {
        label: 'data-filter',
        bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
        moduleType: 'ISOMORPHIC',
        entry: 'data-filter',
        global: 'Filter',
        externals: [],
    },
    /** ******* Sort component ******* */
    {
        label: 'data-sort',
        bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
        moduleType: 'ISOMORPHIC',
        entry: 'data-sort',
        global: 'Sort',
        externals: [],
    },
    /** ******* Sort component ******* */
    {
        label: 'filter-value',
        bundleTypes: [UMD_DEV, UMD_PROD, NODE_DEV, NODE_PROD],
        moduleType: 'ISOMORPHIC',
        entry: 'filter-value',
        global: 'FilterValue',
        externals: [],
    }
];

// Based on deep-freeze by substack (public domain)
function deepFreeze(o) {
    Object.freeze(o);
    Object.getOwnPropertyNames(o).forEach((prop) => {
        if (
            o[prop] !== null &&
            (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
            !Object.isFrozen(o[prop])
        ) {
            deepFreeze(o[prop]);
        }
    });
    return o;
}

// Don't accidentally mutate config as part of the build
deepFreeze(bundles);

module.exports = {
    bundleTypes,
    bundles,
};
