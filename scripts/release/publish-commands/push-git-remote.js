#!/usr/bin/env node


const { execUnlessDry, logPromise, } = require('../utils');

const push = async ({ cwd, dry, }) => {
    await execUnlessDry('git push', { cwd, dry, });
    await execUnlessDry('git push --tags', { cwd, dry, });
};

module.exports = async params => logPromise(push(params), 'Pushing to git remote');
