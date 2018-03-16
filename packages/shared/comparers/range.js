function isBetween(fromRange, toRange, toCompare) {
    if (fromRange && toRange) return fromRange <= toCompare && toRange >= toCompare;
    if (fromRange) return fromRange <= toCompare;
    return toRange >= toCompare;
}

function isTimeBetween(fromRange, toRange, toCompare) {
    let compareDate = toCompare;
    if (!toCompare.getTime) {
        compareDate = new Date(toCompare);
    }
    if (fromRange && toRange) {
        return fromRange.getTime() <= compareDate.getTime() &&
           toRange.getTime() >= compareDate.getTime();
    }
    if (fromRange) return fromRange.getTime() <= compareDate.getTime();
    return toRange.getTime() >= compareDate.getTime();
}
/**
 * Compares range
 *
 * @param {any} toCompare item which will be compared
 * @memberOf FilterValue
 */
const rangeCompare = (item) => {
    const type = item.from ? typeof item.from : typeof item.to;
    if (type !== 'object') return toCompare => isBetween(item.from, item.to, toCompare);
    return toCompare => isTimeBetween(item.from, item.to, toCompare);
};

export default rangeCompare;

