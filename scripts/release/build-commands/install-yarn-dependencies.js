#!/usr/bin/env node


const { exec, } = require('child-process-promise');
const { logPromise, } = require('../utils');

const install = async ({ cwd, }) => await exec('yarn', { cwd, });

module.exports = async ({ cwd, }) => logPromise(install({ cwd, }), 'Installing NPM dependencies');
