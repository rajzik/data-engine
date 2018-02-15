/**
 * Compares dates
 * @see ./update-prototype
 *
 * @param {Date}
 * @memberOf FilterValue
 */
const dateCompare = item => toCompare => item.getTime() === toCompare.getTime();

const dateCompareWithType = type => item => toCompare =>
    item.getTime() === type(toCompare).getTime();

export default dateCompare;
export { dateCompareWithType };
