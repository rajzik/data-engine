/* eslint no-restricted-syntax: "off", no-await-in-loop: "off" */

const { rollup, } = require('rollup');
const babel = require('rollup-plugin-babel');
const closure = require('rollup-plugin-closure-compiler-js');
const commonjs = require('rollup-plugin-commonjs');
const prettier = require('rollup-plugin-prettier');
const replace = require('rollup-plugin-replace');
const stripBanner = require('rollup-plugin-strip-banner');
const chalk = require('chalk');
const resolve = require('rollup-plugin-node-resolve');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const Modules = require('./modules');
const Bundles = require('./bundles');
const Stats = require('./stats');
const sizes = require('./plugins/sizes-plugin');
const Packaging = require('./packaging');
const { asyncCopyTo, asyncRimRaf, } = require('./utils');
const codeFrame = require('babel-code-frame');
const Wrappers = require('./wrappers');

// Errors in promises should be fatal.
const loggedErrors = new Set();
process.on('unhandledRejection', (err) => {
    if (loggedErrors.has(err)) {
        // No need to print it twice.
        process.exit(1);
    }
    throw err;
});


function handleRollupWarning(warning) {
    if (warning.code === 'UNRESOLVED_IMPORT') {
        console.error(warning.message);
        process.exit(1);
    }
    if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
        const match = warning.message.match(/external module '([^']+)'/);
        if (!match || typeof match[1] !== 'string') {
            throw new Error('Could not parse a Rollup warning. Fix this method.');
        }

        // Don't warn. We will remove side effectless require() in a later pass.
        return;
    }
    console.warn(warning.message || warning);
}


function handleRollupError(error) {
    loggedErrors.add(error);
    if (!error.code) {
        console.error(error);
        return;
    }
    console.error(`\x1b[31m-- ${error.code}${error.plugin ? ` (${error.plugin})` : ''} --`);
    console.error(error.message);
    const { file, line, column, } = error.loc;
    if (file) {
        const rawLines = fs.readFileSync(file, 'utf-8');
        const frame = codeFrame(rawLines, line, column + 1, {
            highlightCode: true,
        });
        console.error(frame);
    } else {
        console.error(error.codeFrame);
    }
}


const {
    UMD_DEV,
    UMD_PROD,
    NODE_DEV,
    NODE_PROD,
} = Bundles.bundleTypes;

const requestedBundleTypes = (argv.type || '')
    .split(',')
    .map(type => type.toUpperCase());
const requestedBundleNames = (argv._[0] || '')
    .split(',')
    .map(type => type.toLowerCase());
const forcePrettyOutput = argv.pretty;
const shouldExtractErrors = argv['extract-errors'];


const closureOptions = {
    compilationLevel: 'SIMPLE',
    languageIn: 'ECMASCRIPT5_STRICT',
    languageOut: 'ECMASCRIPT5_STRICT',
    env: 'CUSTOM',
    warningLevel: 'QUIET',
    applyInputSourceMaps: false,
    useTypesForOptimization: false,
    processCommonJsModules: false,
};

function getBabelConfig(updateBabelOptions) {
    let options = {
        exclude: 'node_modules/**',
        presets: [],
        plugins: [],
    };
    if (updateBabelOptions) {
        options = updateBabelOptions(options);
    }
    return options;
}

function getRollupOutputOptions(outputPath, format, globalName) {
    return Object.assign(
        {},
        {
            file: outputPath,
            format,
            interop: false,
            name: globalName,
            sourcemap: false,
        }
    );
}

function getFormat(bundleType) {
    switch (bundleType) {
    case UMD_DEV:
    case UMD_PROD:
        return 'umd';
    case NODE_DEV:
    case NODE_PROD:
        return 'cjs';
    default:
        return '';
    }
}

function getFilename(name, globalName, bundleType) {
    // we do this to replace / to -, for react-dom/server
    const ourName = name.replace('/', '-');
    switch (bundleType) {
    case UMD_DEV:
        return `${ourName}.development.js`;
    case UMD_PROD:
        return `${ourName}.production.min.js`;
    case NODE_DEV:
        return `${ourName}.development.js`;
    case NODE_PROD:
        return `${ourName}.production.min.js`;
    default:
        return `${ourName}.js`;
    }
}

function isProductionBundleType(bundleType) {
    switch (bundleType) {
    case UMD_DEV:
    case NODE_DEV:
        return false;
    case UMD_PROD:
    case NODE_PROD:
        return true;
    default:
        throw new Error(`Unknown type: ${bundleType}`);
    }
}

function getPlugins(
    entry,
    externals,
    updateBabelOptions,
    filename,
    packageName,
    bundleType,
    globalName,
    moduleType
) {
    const isProduction = isProductionBundleType(bundleType);
    const isInGlobalScope = bundleType === UMD_DEV || bundleType === UMD_PROD;
    const shouldStayReadable = forcePrettyOutput;
    return [
        // Extract error codes from invariant() messages into a file.
        shouldExtractErrors && {
            transform(source) {
                return source;
            },
        },
        // Use Node resolution mechanism.
        resolve({
            external: externals,
        }),
        // Remove license headers from individual modules
        stripBanner({
            exclude: 'node_modules/**/*',
        }),
        // Compile to ES5.
        babel(getBabelConfig(updateBabelOptions, bundleType)),
        // Remove 'use strict' from individual source files.
        {
            transform(source) {
                return source.replace(/['"]use strict['"']/g, '');
            },
        },
        // Turn __DEV__ and process.env checks into constants.
        replace({
            __DEV__: isProduction ? 'false' : 'true',
            'process.env.NODE_ENV': isProduction ? "'production'" : "'development'",
        }),
        // We still need CommonJS for external deps like object-assign.
        commonjs(),
        // Apply dead code elimination and/or minification.
        isProduction &&
        closure(Object.assign({}, closureOptions, {
            assumeFunctionWrapper: !isInGlobalScope,
            renaming: !shouldStayReadable,
        })),
        // Add the whitespace back if necessary.
        shouldStayReadable && prettier(),
        // License and haste headers, top-level `if` blocks.
        {
            transformBundle(source) {
                return Wrappers.wrapBundle(
                    source,
                    bundleType,
                    globalName,
                    filename,
                    moduleType
                );
            },
        },
        // Record bundle size.
        sizes({
            getSize: (size, gzip) => {
                const currentSizes = Stats.currentBuildResults.bundleSizes;
                const recordIndex = currentSizes.findIndex(record =>
                    record.filename === filename && record.bundleType === bundleType);
                const index = recordIndex !== -1 ? recordIndex : currentSizes.length;
                currentSizes[index] = {
                    filename,
                    bundleType,
                    packageName,
                    size,
                    gzip,
                };
            },
        })
    ].filter(Boolean);
}

function shouldSkipBundle(bundle, bundleType) {
    const shouldSkipBundleType = bundle.bundleTypes.indexOf(bundleType) === -1;
    if (shouldSkipBundleType) {
        return true;
    }
    if (requestedBundleTypes.length > 0) {
        const isAskingForDifferentType = requestedBundleTypes
            .every(requestedType => bundleType.indexOf(requestedType) === -1);
        if (isAskingForDifferentType) {
            return true;
        }
    }
    if (requestedBundleNames.length > 0) {
        const isAskingForDifferentNames = requestedBundleNames
            .every(requestedName => bundle.label.indexOf(requestedName) === -1);
        if (isAskingForDifferentNames) {
            return true;
        }
    }
    return false;
}

async function createBundle(bundle, bundleType) {
    if (shouldSkipBundle(bundle, bundleType)) {
        return;
    }
    const filename = getFilename(bundle.entry, bundle.global, bundleType);
    const logKey =
        chalk.white.bold(filename) + chalk.dim(` (${bundleType.toLowerCase()})`);
    const format = getFormat(bundleType);
    const packageName = Packaging.getPackageName(bundle.entry);

    const resolvedEntry = require.resolve(bundle.entry);


    const shouldBundleDependencies =
        bundleType === UMD_DEV || bundleType === UMD_PROD;

    let externals = [];
    if (!shouldBundleDependencies) {
        const deps = Modules.getDependencies(bundleType, bundle.entry);
        externals = externals.concat(deps);
    }


    const rollupConfig = {
        input: resolvedEntry,

        onwarn: handleRollupWarning,
        plugins: getPlugins(
            bundle.entry,
            externals,
            bundle.babel,
            filename,
            packageName,
            bundleType,
            bundle.global,
            bundle.moduleType,
            bundle.modulesToStub
        ),
        external: externals,
        // We can't use getters in www.
        legacy: false,
    };
    const [mainOutputPath, ...otherOutputPaths] = Packaging.getBundleOutputPaths(
        bundleType,
        filename,
        packageName
    );
    const rollupOutputOptions = getRollupOutputOptions(
        mainOutputPath,
        format,
        bundle.global
    );

    console.log(`${chalk.bgYellow.black(' BUILDING ')} ${logKey}`);
    try {
        const result = await rollup(rollupConfig);
        await result.write(rollupOutputOptions);
    } catch (error) {
        console.log(`${chalk.bgRed.black(' OH NOES! ')} ${logKey}\n`);
        handleRollupError(error);
        throw error;
    }
    for (let i = 0; i < otherOutputPaths.length; i++) {
        await asyncCopyTo(mainOutputPath, otherOutputPaths[i]);
    }
    console.log(`${chalk.bgGreen.black(' COMPLETE ')} ${logKey}\n`);
}

async function buildEverything() {
    await asyncRimRaf('build');

    // Run them serially for better console output
    // and to avoid any potential race conditions.

    for (const bundle of Bundles.bundles) {
        await createBundle(bundle, UMD_DEV);
        await createBundle(bundle, UMD_PROD);
        await createBundle(bundle, NODE_DEV);
        await createBundle(bundle, NODE_PROD);
    }

    await Packaging.prepareNpmPackages();

    console.log(Stats.printResults());

    if (!forcePrettyOutput) {
        Stats.saveResults();
    }

    if (shouldExtractErrors) {
        console.warn('\nWarning: this build was created with --extract-errors enabled.\n' +
            'this will result in extremely slow builds and should only be\n' +
            'used when the error map needs to be rebuilt.\n');
    }
}

buildEverything();
