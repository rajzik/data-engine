#!/usr/bin/env node


const chalk = require('chalk');
const { join, relative, } = require('path');
const { getUnexecutedCommands, } = require('../utils');

const CHANGELOG_PATH =
  'https://github.com/rajzik/data-engine/edit/master/CHANGELOG.md';

module.exports = ({
    dry, path, version,
}) => {
    const publishPath = relative(
        process.env.PWD,
        join(__dirname, '../publish.js')
    );
    const command =
    `${publishPath} -v ${version}${
        path ? ` -p ${path}` : ''
    }${dry ? ' --dry' : ''}`;

    console.log(chalk`
    {green.bold Build successful!}
    ${getUnexecutedCommands()}
    Next there are a couple of manual steps:

    {bold.underline Step 1: Update the CHANGELOG}

    {yellow.bold ${command}}
  `.replace(/\n +/g, '\n'));
};
