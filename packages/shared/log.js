/* eslint-disable */

function logf() {
    console.log.call(arguments);
}

function warnf() {
    console.warn.call(arguments);
}

function noop() {};

let log = noop;
let warn = noop;
if (__DEV__) {
    log = logf;
    warn = warnf;
}

export {
    log,
    warn
}