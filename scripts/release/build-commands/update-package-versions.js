#!/usr/bin/env node


const chalk = require('chalk');
const { exec, } = require('child-process-promise');
const { readFileSync, writeFileSync, } = require('fs');
const { readJson, writeJson, } = require('fs-extra');
const { join, } = require('path');
const semver = require('semver');
const { execUnlessDry, logPromise, } = require('../utils');

const update = async ({
    cwd, dry, packages, version,
}) => {
    try {
    // Update root package.json
        const packagePath = join(cwd, 'package.json');
        const rootPackage = await readJson(packagePath);
        rootPackage.version = version;
        await writeJson(packagePath, rootPackage, { spaces: 2, });

        // Update engineVersion source file
        const versionPath = join(cwd, 'packages/shared/version.js');
        const engineVersion = readFileSync(versionPath, 'utf8').replace(
            /module\.exports = '[^']+';/,
            `module.exports = '${version}';`
        );
        writeFileSync(versionPath, engineVersion);


        // Update renderer versions and peer dependencies
        const updateProjectPackage = async (project) => {
            const path = join(cwd, 'packages', project, 'package.json');
            const json = await readJson(path);

            // Unstable packages (eg version < 1.0) are treated specially:
            // Rather than use the release version (eg 16.1.0)-
            // We just auto-increment the minor version (eg 0.1.0 -> 0.2.0).
            // If we're doing a prerelease, we also append the suffix (eg 0.2.0-beta).
            if (semver.lt(json.version, '1.0.0')) {
                const prerelease = semver.prerelease(version);
                let suffix = '';
                if (prerelease) {
                    suffix = `-${prerelease.join('.')}`;
                }
                json.version = `0.${semver.minor(json.version) + 1}.0${suffix}`;
            } else {
                json.version = version;
            }
            json.dependencies = Object.keys(json.dependencies).reduce((acc, current) => {
                const ret = { ...acc, [current]: json.dependencies[current], };
                if (packages.some(item => item === current)) {
                    ret[current] = `^${version}`;
                }
                return ret;
            }, {});
            await writeJson(path, json, { spaces: 2, });
        };
        await Promise.all(packages.map(updateProjectPackage));

        // Version sanity check
        await exec('yarn version-check', { cwd, });

        await execUnlessDry(
            `git commit -am "Updating package versions for release ${version}"`,
            { cwd, dry, }
        );
    } catch (error) {
        throw Error(chalk`
      Failed while updating package versions

      {white ${error.message}}
    `);
    }
};

module.exports = async params => logPromise(update(params), 'Updating package versions');
