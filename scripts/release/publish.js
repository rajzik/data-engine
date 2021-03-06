#!/usr/bin/env node


const chalk = require('chalk');
const logUpdate = require('log-update');
const { getPublicPackages, } = require('./utils');

const parsePublishParams = require('./publish-commands/parse-publish-params');
const pushGitRemote = require('./publish-commands/push-git-remote');
const publishToNpm = require('./publish-commands/publish-to-npm');

// Follows the steps outlined in github.com/facebook/react/issues/10620
const run = async () => {
    const params = parsePublishParams();
    params.packages = getPublicPackages();

    try {
        await pushGitRemote(params);
        await publishToNpm(params);
    } catch (error) {
        logUpdate.clear();

        const message = error.message.trim().replace(/\n +/g, '\n');
        const stack = error.stack.replace(error.message, '');

        console.log(`${chalk.bgRed.white(' ERROR ')} ${chalk.red(message)}\n\n${chalk.gray(stack)}`);

        process.exit(1);
    }
};

run();
