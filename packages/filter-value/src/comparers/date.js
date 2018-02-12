/**
 * Compares dates
 * @see ./update-prototype
 *
 * @param {Date}
 * @memberOf FilterValue
 */
const dateCompare = item => toCompare => item.$.compare(toCompare);

export default dateCompare;
