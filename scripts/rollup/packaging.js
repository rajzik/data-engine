/* eslint no-param-reassign: "off" */

const { existsSync, readdirSync, unlinkSync, } = require('fs');
const Bundles = require('./bundles');
const {
    asyncCopyTo,
    asyncExecuteCommand,
    asyncExtractTar,
    asyncRimRaf,
} = require('./utils');

const {
    UMD_DEV,
    UMD_PROD,
    NODE_DEV,
    NODE_PROD,
} = Bundles.bundleTypes;

function getPackageName(name) {
    if (name.indexOf('/') !== -1) {
        return name.split('/')[0];
    }
    return name;
}

function getBundleOutputPaths(bundleType, filename, packageName) {
    switch (bundleType) {
    case NODE_DEV:
    case NODE_PROD:
        return [`build/node_modules/${packageName}/cjs/${filename}`];
    case UMD_DEV:
    case UMD_PROD:
        return [
            `build/node_modules/${packageName}/umd/${filename}`,
            `build/dist/${filename}`
        ];
    default:
        throw new Error('Unknown bundle type.');
    }
}


function getTarOptions(tgzName, packageName) {
    // Files inside the `npm pack`ed archive start
    // with "package/" in their paths. We'll undo
    // this during extraction.
    const CONTENTS_FOLDER = 'package';
    return {
        src: tgzName,
        dest: `build/node_modules/${packageName}`,
        tar: {
            entries: [CONTENTS_FOLDER],
            map(header) {
                if (header.name.indexOf(`${CONTENTS_FOLDER}/`) === 0) {
                    header.name = header.name.substring(CONTENTS_FOLDER.length + 1);
                }
            },
        },
    };
}

async function prepareNpmPackage(name) {
    await Promise.all([
        asyncCopyTo('LICENSE', `build/node_modules/${name}/LICENSE`),
        asyncCopyTo(
            `packages/${name}/package.json`,
            `build/node_modules/${name}/package.json`
        ),
        asyncCopyTo(
            `packages/${name}/readme.md`,
            `build/node_modules/${name}/readme.md`
        ),
        asyncCopyTo(`packages/${name}/npm`, `build/node_modules/${name}`)
    ]);
    const tgzName = (await asyncExecuteCommand(`npm pack build/node_modules/${name}`)).trim();
    await asyncRimRaf(`build/node_modules/${name}`);
    await asyncExtractTar(getTarOptions(tgzName, name));
    unlinkSync(tgzName);
}

async function prepareNpmPackages() {
    if (!existsSync('build/node_modules')) {
        // We didn't build any npm packages.
        return;
    }
    const builtPackageFolders = readdirSync('build/node_modules').filter(dir => dir.charAt(0) !== '.');
    await Promise.all(builtPackageFolders.map(prepareNpmPackage));
}

module.exports = {
    getPackageName,
    getBundleOutputPaths,
    prepareNpmPackages,
};
