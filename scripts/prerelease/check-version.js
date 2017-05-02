

const currentVersion = require('../../package.json').version;
const versions = {
    'packages/data-engine/package.json': require('../../packages/data-engine/package.json').version,
    'packages/filter-value/package.json': require('../../packages/filter-value/package.json').version,
    'packages/filter/package.json': require('../../packages/filter/package.json').version,
    'packages/sort/package.json': require('../../packages/sort/package.json').version,
};

let allVersionsMatch = true;
Object.keys(versions).forEach((name) => {
    const version = versions[name];
    if (version !== currentVersion) {
        allVersionsMatch = false;
        console.log('%s version does not match package.json. Expected %s, saw %s.', name, currentVersion, version);
    }
});

if (!allVersionsMatch) {
    process.exit(1);
}
