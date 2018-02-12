/** comparing array of FilterValue!
 *
 * @param {any} toCompare - item which will be compared.
 *
 * @return {boolean} compare value
 * @memberOf FilterValue
 */
const arrayCompare = item => toCompare => item.some(itm => itm.compare(toCompare));

export default arrayCompare;
