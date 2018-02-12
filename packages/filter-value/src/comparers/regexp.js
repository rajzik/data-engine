

/**
 * Basic regexp test
 *
 * @param {any} toCompare - item which will be compared.
 * @return {boolean} compare value
 *
 * @memberOf FilterValue
 */
const regexpCompare = item => toCompare => item.test(`${toCompare}`);

export default regexpCompare;
