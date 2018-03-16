/* eslint-disable */

function logFunction() {
    console.log(...arguments);
}

function warnFunction() {
    console.warn(...arguments);
}

function errorFunction() {
    const { stack, } = new Error();
    console.error(stack, '\n', ...arguments);
}

function noop() {};

let log = noop;
let warn = noop;
let error = noop;

if (!__TEST__) {
    error = errorFunction;
} else if (__DEV__) {
    log = logFunction;
    warn = warnFunction;
}

export {
    log,
    warn,
    error
}