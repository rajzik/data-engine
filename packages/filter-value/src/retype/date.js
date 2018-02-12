import { error } from 'shared/log';

const dateRetype = (item) => {
    try {
        return new Date(item);
    } catch (e) {
        error(`${item} does not have format to parse with native function!`);
        throw e;
    }
};

export default dateRetype;

