

const chalk = require('chalk');


const env = jasmine.getEnv();


// We have a Babel transform that inserts guards against infinite loops.
// If a loop runs for too many iterations, we throw an error and set this
// global variable. The global lets us detect an infinite loop even if
// the actual error object ends up being caught and ignored. An infinite
// loop must always fail the test!
env.beforeEach(() => {
    global.infiniteLoopError = null;
});
env.afterEach(() => {
    const error = global.infiniteLoopError;
    global.infiniteLoopError = null;
    if (error) {
        throw error;
    }
});

['error', 'warn'].forEach((methodName) => {
    const unexpectedConsoleCallStacks = [];
    const newMethod = (message) => {
        // Capture the call stack now so we can warn about it later.
        // The call stack has helpful information for the test author.
        // Don't throw yet though b'c it might be accidentally caught and suppressed.
        const { stack, } = new Error();
        unexpectedConsoleCallStacks.push([
            stack.substr(stack.indexOf('\n') + 1),
            message
        ]);
    };

    console[methodName] = newMethod;

    env.beforeEach(() => {
        unexpectedConsoleCallStacks.length = 0;
    });

    env.afterEach(() => {
        if (console[methodName] !== newMethod) {
            throw new Error(`Test did not tear down console.${methodName} mock properly.`);
        }

        if (unexpectedConsoleCallStacks.length > 0) {
            const messages = unexpectedConsoleCallStacks.map(([stack, message]) =>
                `${chalk.red(message)}\n` +
            `${stack
                .split('\n')
                .map(line => chalk.gray(line))
                .join('\n')}`);

            const message =
          `Expected test not to call ${chalk.bold(`console.${methodName}()`)}.\n\n` +
          'If the warning is expected, test for it explicitly by:\n' +
          `1. Using the ${chalk.bold('.toWarnDev()')} / ${chalk.bold('.toLowPriorityWarnDev()')} matchers, or...\n` +
          `2. Mock it out using ${chalk.bold('spyOnDev')}(console, '${
              methodName
          }') or ${chalk.bold('spyOnProd')}(console, '${
              methodName
          }'), and test that the warning occurs.`;

            throw new Error(`${message}\n\n${messages.join('\n\n')}`);
        }
    });
});

if (process.env.NODE_ENV === 'production') {
    // In production, we strip error messages and turn them into codes.
    // This decodes them back so that the test assertions on them work.
    const decodeErrorMessage = (message) => {
        if (!message) {
            return message;
        }
        const re = /error-decoder.html\?invariant=(\d+)([^\s]*)/;
        const matches = message.match(re);
        if (!matches || matches.length !== 3) {
            return message;
        }
        const args = matches[2]
            .split('&')
            .filter(s => s.startsWith('args[]='))
            .map(s => s.substr('args[]='.length))
            .map(decodeURIComponent);
        const format = '%s';
        let argIndex = 0;
        return format.replace(/%s/g, () => args[argIndex++]);
    };
    const OriginalError = global.Error;
    const ErrorProxy = new Proxy(OriginalError, {
        apply(target, thisArg, argumentsList) {
            const error = Reflect.apply(target, thisArg, argumentsList);
            error.message = decodeErrorMessage(error.message);
            return error;
        },
        construct(target, argumentsList, newTarget) {
            const error = Reflect.construct(target, argumentsList, newTarget);
            error.message = decodeErrorMessage(error.message);
            return error;
        },
    });
    ErrorProxy.OriginalError = OriginalError;
    global.Error = ErrorProxy;
}

require('jasmine-check').install();
