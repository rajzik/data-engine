/**
 * Basic exact compare. `===`! for number and strings.
 *
 * @param {any} toCompare - item which will be compared.
 * @return {boolean} compare value
 * @memberOf FilterValue
 */
const basicCompare = item => toCompare => item === toCompare;

const basicCompareWithType = type => item => toCompare => type(toCompare) === item;

export default basicCompare;
export { basicCompareWithType };
