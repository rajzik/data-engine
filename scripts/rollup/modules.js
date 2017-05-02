
const resolve = require('path').resolve;
const basename = require('path').basename;
const sync = require('glob').sync;


const exclude = [
    'src/**/__benchmarks__/**/*.js',
    'src/**/__tests__/**/*.js',
    'src/**/__mocks__/**/*.js',
];

function createModuleMap(paths) {
    const moduleMap = {};

    paths.forEach((path) => {
        const files = sync(path, { ignore: exclude });

        files.forEach((file) => {
            const moduleName = basename(file, '.js');

            moduleMap[moduleName] = resolve(file);
        });
    });

    return moduleMap;
}

function getAliases(paths) {
    return Object.assign(
    createModuleMap(paths));
}


module.exports = {
    getAliases,
};
