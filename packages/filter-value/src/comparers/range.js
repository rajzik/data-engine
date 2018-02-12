/**
 * Compares range
 * @see ./update-prototype
 *
 * @param {any} toCompare item which will be compared
 * @memberOf FilterValue
 */
const rangeCompare = item => toCompare =>
    item.from.$.isLess(toCompare) &&
    item.to.$.isGreater(toCompare);

export default rangeCompare;

