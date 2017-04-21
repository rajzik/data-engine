'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = regexEscape;
var specials = ['-', '[', ']', '/', '{', '}', '(', ')', '*', '+', '?', '.', '\\', '^', '$', '|'];
var regex = RegExp('[' + specials.join('\\') + ']', 'g');

/**
 * Replacing unwanted characters with \\
 *
 * @export
 * @param {string} string string which you want to escape
 * @returns {string} escaped values
 */
function regexEscape(string) {
    return string.replace(regex, '\\$&');
}