function isBetween(fromRange, toRange, toCompare) {
    return fromRange <= toCompare && toRange >= toCompare;
}

function isTimeBetween(fromRange, toRange, toCompare) {
    return !!toCompare.getTime &&
        fromRange.getTime() <= toCompare.getTime() &&
        toRange.getTime() >= toCompare.getTime();
}
/**
 * Compares range
 *
 * @param {any} toCompare item which will be compared
 * @memberOf FilterValue
 */
const rangeCompare = (item) => {
    if (typeof item.from !== 'object') return toCompare => isBetween(item.from, item.to, toCompare);
    return toCompare => isTimeBetween(item.from, item.to, toCompare);
};
export default rangeCompare;

