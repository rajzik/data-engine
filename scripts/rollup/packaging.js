
const ncp = require('ncp').ncp;
const resolve = require('path').resolve;
const fs = require('fs');
const archiver = require('archiver')('zip');


const Bundles = require('./bundles');

const UMD_DEV = Bundles.bundleTypes.UMD_DEV;
const UMD_PROD = Bundles.bundleTypes.UMD_PROD;
const NODE_DEV = Bundles.bundleTypes.NODE_DEV;
const NODE_PROD = Bundles.bundleTypes.NODE_PROD;


function asyncCopyTo(from, to) {
    return new Promise((_resolve) => {
        ncp(from, to, (error) => {
            if (error) {
                console.error(error);
                process.exit(1);
            }
            _resolve();
        });
    });
}

function getPackageName(name) {
    if (name.indexOf('/') !== -1) {
        return name.split('/')[0];
    }
    return name;
}


function packPackage(packageName) {
    const packageDirectory = resolve(`./build/packages/${packageName}`);
    if (fs.existsSync(packageDirectory)) {
    }
    return Promise.resolve();
}


function copyBundleIntoNodePackage(packageName, filename, bundleType) {
    const packageDirectory = resolve(`./build/packages/${packageName}`);
    if (fs.existsSync(packageDirectory)) {
        let from = resolve(`./build/${filename}`);
        let to = `${packageDirectory}/${filename}`;
        // for UMD bundles we have to move the files into a umd directory
        // within the package directory. we also need to set the from
        // to be the root build from directory
        if (bundleType === UMD_DEV || bundleType === UMD_PROD) {
            const distDirectory = `${packageDirectory}/umd`;
            // create a dist directory if not created
            if (!fs.existsSync(distDirectory)) {
                fs.mkdirSync(distDirectory);
            }
            from = resolve(`./build/dist/${filename}`);
            to = `${packageDirectory}/umd/${filename}`;
        }
        // for NODE bundles we have to move the files into a cjs directory
        // within the package directory. we also need to set the from
        // to be the root build from directory
        if (bundleType === NODE_DEV || bundleType === NODE_PROD) {
            const distDirectory = `${packageDirectory}/cjs`;
            // create a dist directory if not created
            if (!fs.existsSync(distDirectory)) {
                fs.mkdirSync(distDirectory);
            }
            to = `${packageDirectory}/cjs/${filename}`;
        }
        return asyncCopyTo(from, to).then(() => {
            // delete the old file if this is a not a UMD bundle
            if (bundleType !== UMD_DEV && bundleType !== UMD_PROD) {
                fs.unlinkSync(from);
            }
        });
    }
    return Promise.resolve();
}


function copyNodePackageTemplate(packageName) {
    const from = resolve(`./packages/${packageName}`);
    const to = resolve(`./build/packages/${packageName}`);

    // if the package directory already exists, we skip copying to it
    if (!fs.existsSync(to) && fs.existsSync(from)) {
        return asyncCopyTo(from, to);
    }
    return Promise.resolve();
}


function createNodePackage(bundleType, packageName, filename) {
    console.log(bundleType, packageName, filename);
    // the only case where we don't want to copy the package is for FB bundles
    return copyNodePackageTemplate(packageName).then(() =>
        copyBundleIntoNodePackage(packageName, filename, bundleType)
            .then(() =>
            packPackage(packageName)
        )
    );
}


function getPackageDestination(config, bundleType, filename) {
    let dest = config.destDir + filename;

    if (bundleType === UMD_DEV || bundleType === UMD_PROD) {
        dest = `${config.destDir}dist/${filename}`;
    }
    return dest;
}

module.exports = {
    getPackageDestination,
    createNodePackage,
    getPackageName,
};
