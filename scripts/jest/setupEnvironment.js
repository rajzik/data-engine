/* eslint-disable */

const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV !== 'development' && NODE_ENV !== 'production') {
    throw new Error('NODE_ENV must either be set to development or production.');
}
global.__DEV__ = NODE_ENV === 'development';

global.requestAnimationFrame = (callback) => {
    setTimeout(callback);
};

global.requestIdleCallback = callback => setTimeout(() => {
    callback({
        timeRemaining() {
            return Infinity;
        },
    });
});

global.cancelIdleCallback = (callbackID) => {
    clearTimeout(callbackID);
};

