/* eslint import/no-dynamic-require: "off", global-require: "off" */

const path = require('path');


// Determines node_modules packages that are safe to assume will exist.
function getDependencies(bundleType, entry) {
    const packageJson = require(`${path.basename(path.dirname(require.resolve(entry)))}/package.json`);
    // Both deps and peerDeps are assumed as accessible.
    return Array.from(new Set([
        ...Object.keys(packageJson.dependencies || {}),
        ...Object.keys(packageJson.peerDependencies || {})
    ]));
}


module.exports = {
    getDependencies,
};
