import { error } from 'shared/log';

const dateRetype = (item) => {
    try {
        const date = new Date(item);
        if (!isNaN(date.getTime())) return date;
        throw new TypeError(`${item} does not have format to parse with native function!`);
    } catch (e) {
        error(`${item} does not have format to parse with native function!`);
        throw e;
    }
};

export default dateRetype;

