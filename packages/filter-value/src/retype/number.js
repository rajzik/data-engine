// eslint-disable-next-line
import { error } from 'shared/log';
/**
 * Try to retype to number
 *
 * @param {any} item which should be retyped
 * @return {number} retyped number
 * @memberOf FilterValue
 */
const numberRetype = (item) => {
    if (typeof item === 'number') return item;
    try {
        return parseFloat(item);
    } catch (e) {
        error(`${item} does not have format to parse with native function!`);
        throw e;
    }
};

export default numberRetype;
