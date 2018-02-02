

const { ncp, } = require('ncp');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const { exec, } = require('child_process');
const targz = require('targz');


function asyncMkDirP(filepath) {
    return new Promise((resolve, reject) =>
        mkdirp(filepath, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        }));
}

function asyncCopyTo(from, to) {
    return asyncMkDirP(path.dirname(to)).then(() =>
        new Promise((resolve, reject) => {
            ncp(from, to, (error) => {
                if (error) {
                    // Wrap to have a useful stack trace.
                    reject(new Error(error));
                    return;
                }
                resolve();
            });
        }));
}

function asyncExecuteCommand(command) {
    return new Promise((resolve, reject) =>
        exec(command, (error, stdout) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        }));
}

function asyncExtractTar(options) {
    return new Promise((resolve, reject) =>
        targz.decompress(options, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        }));
}


function asyncRimRaf(filepath) {
    return new Promise((resolve, reject) =>
        rimraf(filepath, (error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        }));
}

function resolvePath(filepath) {
    if (filepath[0] === '~') {
        return path.join(process.env.HOME, filepath.slice(1));
    }
    return path.resolve(filepath);
}

module.exports = {
    asyncCopyTo,
    resolvePath,
    asyncExecuteCommand,
    asyncExtractTar,
    asyncMkDirP,
    asyncRimRaf,
};
