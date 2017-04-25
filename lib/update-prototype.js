"use strict";

/* eslint-disable */

// WARNING NOT BEST PRACTICE!!! CAN BE VERY DANGEROUS!!!

Number.prototype.$ = {};

Number.prototype.$.isGreater = function (toCompare) {
    return this >= toCompare;
};

Number.prototype.$.isLess = function (toCompare) {
    return this <= toCompare;
};

String.prototype.$ = {};

String.prototype.$.isGreater = function (toCompare) {
    return this >= toCompare;
};

String.prototype.$.isLess = function (toCompare) {
    return this <= toCompare;
};

Date.prototype.$ = {};

Date.prototype.$.compare = function (toCompare) {
    return this.getTime() === toCompare.getTime();
};

Date.prototype.$.isGreater = function (toCompare) {
    return this.getTime() >= toCompare.getTime();
};

Date.prototype.$.isLess = function (toCompare) {
    return this.getTime() <= toCompare.getTime();
};