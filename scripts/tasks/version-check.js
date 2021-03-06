/* eslint global-require: "off" */

const EngineVersion = require('../../package.json').version;

const versions = {
    'packages/data-engine/package.json': require('../../packages/data-engine/package.json')
        .version,
    'packages/data-filter/package.json': require('../../packages/data-filter/package.json')
        .version,
    'packages/data-sort/package.json': require('../../packages/data-sort/package.json')
        .version,
    'packages/filter-value/package.json': require('../../packages/filter-value/package.json')
        .version,
};

let allVersionsMatch = true;
Object.keys(versions).forEach((name) => {
    const version = versions[name];
    if (version !== EngineVersion) {
        allVersionsMatch = false;
        console.log(
            '%s version does not match package.json. Expected %s, saw %s.',
            name,
            EngineVersion,
            version
        );
    }
});

if (!allVersionsMatch) {
    process.exit(1);
}
