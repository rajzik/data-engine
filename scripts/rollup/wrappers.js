'use strict';

const Bundles = require('./bundles');
const EngineVersion = require('../../package.json').version;

const UMD_DEV = Bundles.bundleTypes.UMD_DEV;
const UMD_PROD = Bundles.bundleTypes.UMD_PROD;
const NODE_DEV = Bundles.bundleTypes.NODE_DEV;
const NODE_PROD = Bundles.bundleTypes.NODE_PROD;


const license = ` * Copyright Jan Silhan
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.`;

const wrappers = {
    /***************** UMD_DEV *****************/
    [UMD_DEV](source, globalName, filename, moduleType) {
        return `/** @license Engine v${EngineVersion}
 * ${filename}
 *
${license}
 */

'use strict';

${source}`;
    },

    /***************** UMD_PROD *****************/
    [UMD_PROD](source, globalName, filename, moduleType) {
        return `/** @license React v${EngineVersion}
 * ${filename}
 *
${license}
 */
${source}`;
    },

    /***************** NODE_DEV *****************/
    [NODE_DEV](source, globalName, filename, moduleType) {
        return `/** @license React v${EngineVersion}
 * ${filename}
 *
${license}
 */

'use strict';

if (process.env.NODE_ENV !== "production") {
  (function() {
${source}
  })();
}`;
    },

    /***************** NODE_PROD *****************/
    [NODE_PROD](source, globalName, filename, moduleType) {
        return `/** @license React v${EngineVersion}
 * ${filename}
 *
${license}
 */
${source}`;
    },
};


function wrapBundle(source, bundleType, globalName, filename, moduleType) {
    const wrapper = wrappers[bundleType];
    if (typeof wrapper !== 'function') {
        throw new Error(`Unsupported build type: ${bundleType}.`);
    }
    return wrapper(source, globalName, filename, moduleType);
}

module.exports = {
    wrapBundle,
};
