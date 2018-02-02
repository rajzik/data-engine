const specials = [
    '-',
    '[',
    ']',
    '/',
    '{',
    '}',
    '(',
    ')',
    '*',
    '+',
    '?',
    '.',
    '\\',
    '^',
    '$',
    '|'
];
const regex = RegExp(`[${specials.join('\\')}]`, 'g');

/**
 * Replacing unwanted characters with \\
 *
 * @export
 * @param {string} string string which you want to escape
 * @returns {string} escaped values
 */
export default function regexEscape(string) {
    return string.replace(regex, '\\$&');
}
