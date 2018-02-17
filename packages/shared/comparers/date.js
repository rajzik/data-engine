/**
 * Compares dates
 *
 * @param {Date}
 * @memberOf FilterValue
 */
const dateCompare = item => (toCompare) => {
    let compareDate = toCompare;
    if (!toCompare.getTime) {
        compareDate = new Date(toCompare);
    }
    return item.getTime() === compareDate.getTime();
};

export default dateCompare;
