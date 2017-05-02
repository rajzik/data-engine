

const rollup = require('rollup').rollup;
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');
const alias = require('rollup-plugin-alias');
const rimraf = require('rimraf');
const fs = require('fs');
const join = require('path').join;

const replace = require('rollup-plugin-replace');

const Bundles = require('./bundles');
const Packaging = require('./packaging');

const UMD_DEV = Bundles.bundleTypes.UMD_DEV;
const UMD_PROD = Bundles.bundleTypes.UMD_PROD;
const NODE_DEV = Bundles.bundleTypes.NODE_DEV;
const NODE_PROD = Bundles.bundleTypes.NODE_PROD;
const Modules = require('./modules');

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


function getFilename(name, bundleType) {
  // we do this to replace / to -, for react-dom/server
    const newName = name.replace('/', '-');
    console.log(newName, bundleType);
    switch (bundleType) {
    case UMD_DEV:
        return `${newName}.development.js`;
    case UMD_PROD:
        return `${newName}.production.min.js`;
    case NODE_DEV:
        return `${newName}.development.js`;
    case NODE_PROD:
        return `${newName}.production.min.js`;
    default:
        return '';
    }
}


function uglifyConfig() {
    return {
        warnings: false,
        compress: {
            screw_ie8: true,
            dead_code: true,
            unused: true,
            drop_debugger: true,
            evaluate: true,
            booleans: true,
            // Our www inline transform combined with Jest resetModules is confused
            // in some rare cases unless we keep all requires at the top:
            hoist_funs: true,
        },
        output: {
            beautify: false,
        },
    };
}


function handleRollupWarnings(warning) {
    if (warning.code === 'UNRESOLVED_IMPORT') {
        console.error(warning.message);
        process.exit(1);
    }
    console.warn(warning.message || warning);
}


function stripEnvVariables(production) {
    return {
        __DEV__: production ? 'false' : 'true',
        'process.env.NODE_ENV': production ? "'production'" : "'development'",
    };
}

function getPlugins(entry, babelOpts, paths, filename, bundleType) {
    const plugins = [
        babel(babelOpts),
        alias(Modules.getAliases(paths))
    ];

    switch (bundleType) {
    case UMD_DEV:
    case NODE_DEV:
        plugins.push(replace(stripEnvVariables(false)));
        break;
    case UMD_PROD:
    case NODE_PROD:
        plugins.push(
            replace(stripEnvVariables(true)),
            // needs to happen after strip env
            uglify(uglifyConfig()));
        break;
    default:
        break;
    }

    return plugins;
}


function updateBundleConfig(config, filename, format, bundleType) {
    return Object.assign({}, config, {
        dest: Packaging.getPackageDestination(config, bundleType, filename),
        format,
        interop: false,
    });
}

function createBundle(bundle, bundleType) {
    const shouldSkipBundleType = bundle.bundleTypes.indexOf(bundleType) === -1;
    if (shouldSkipBundleType) {
        return Promise.resolve();
    }

    console.log(bundle);
    const filename = getFilename(bundle.name, bundleType);
    const logKey = `${filename} - (${bundleType.toLowerCase()})`;
    const format = getFormat(bundleType);
    const packageName = Packaging.getPackageName(bundle.name);

    console.log(`STARTING ${logKey}`);

    return rollup({
        entry: bundle.entry,
        onwarn: handleRollupWarnings,
        plugins: getPlugins(bundle.entry, bundle.babelOpts, bundle.paths, filename, bundleType),
    })
    .then(result =>
      result.write(
        updateBundleConfig(
          bundle.config,
          filename,
          format,
          bundleType)))
    .then(() =>
        Packaging.createNodePackage(bundleType, packageName, filename)
    )
    .then(() => {
        console.log(`COMPLETE - ${logKey}\n`);
    })
    .catch((error) => {
        if (error.code) {
            console.error(`\x1b[31m-- ${error.code} (${error.plugin}) --`);
            console.error(error.message);
            console.error(error.loc);
            console.error(error.codeFrame);
        } else {
            console.error(error);
        }
        process.exit(1);
    });
}

function runWaterfall(promiseFactories) {
    if (promiseFactories.length === 0) {
        return Promise.resolve();
    }

    const head = promiseFactories[0];
    const tail = promiseFactories.slice(1);

    const nextPromiseFactory = head;
    const nextPromise = nextPromiseFactory();
    if (!nextPromise || typeof nextPromise.then !== 'function') {
        throw new Error('runWaterfall() received something that is not a Promise.');
    }

    return nextPromise.then(() => runWaterfall(tail));
}
rimraf('build', () => {
  // create a new build directory
    fs.mkdirSync('build');
  // create the packages folder for NODE+UMD bundles
    fs.mkdirSync(join('build', 'packages'));
  // create the dist folder for UMD bundles
    fs.mkdirSync(join('build', 'dist'));

    const tasks = [];
    for (const bundle of Bundles.bundles) {
        tasks.push(
      () => createBundle(bundle, UMD_DEV),
      () => createBundle(bundle, UMD_PROD),
      () => createBundle(bundle, NODE_DEV),
      () => createBundle(bundle, NODE_PROD));
    }
  // rather than run concurently, opt to run them serially
  // this helps improve console/warning/error output
  // and fixes a bunch of IO failures that sometimes occured
    return runWaterfall(tasks)
    .then(() => {
        console.log('something');
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
});


// export default {
//     entry: 'src/index.js',
//     dest: 'lib/index.min.js',
//     format: 'umd',
//     moduleName: 'DataEngine',
//     plugins: [
//         babel({
//             exclude: 'node_modules/**',
//         }),
//         uglify(),
//     ],
// };
