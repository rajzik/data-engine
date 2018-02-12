/**
 * Function compare when user give compare item as function!
 *
 * @param {any} toCompare - item which will be compared.
 *
 * @return {boolean} compare value
 * @memberOf FilterValue
 */
const funcCompare = item => toCompare => item(toCompare);

export default funcCompare;
