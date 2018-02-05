

module.exports = {
    haste: {
        hasteImplModulePath: require.resolve('./noHaste.js'),
    },
    modulePathIgnorePatterns: [
        '<rootDir>/scripts/rollup/shims/',
        '<rootDir>/scripts/bench/'
    ],
    transform: {
        '.*': require.resolve('./preprocessor.js'),
    },
    setupFiles: [require.resolve('./setupEnvironment.js')],
    // setupTestFrameworkScriptFile: require.resolve('./setupTests.js'),
    // Only include files directly in __tests__, not in nested folders.
    testRegex: '/__tests__/[^/]*(\\.js)$',
    moduleFileExtensions: ['js', 'json', 'node'],
    rootDir: process.cwd(),
    roots: ['<rootDir>/packages'],
    collectCoverageFrom: ['packages/**/*.js'],
    timers: 'fake',
};
