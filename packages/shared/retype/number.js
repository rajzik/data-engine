// eslint-disable-next-line
import { error } from 'shared/log';
/**
 * Try to retype to number
 *
 * @param {any} item which should be retyped
 * @return {number} retyped number
 * @memberOf FilterValue
 */
const numberRetype = item => parseFloat(item);

export default numberRetype;
