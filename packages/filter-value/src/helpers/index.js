import { primitiveTypes, staticTypes } from '../constants/types';

/**
 * Checking for primitive types detectable with typeof
 *
 *
 * @returns {string|null} name of primitive type or null
 * @memberOf FilterValue
 */
const checkPrimitiveType = item => primitiveTypes[typeof item] || null;

/**
 * checkBasicTypes checking basic types
 *
 * @param {any} item
 * @return {string/null} name of type if exist
 * @memberOf FilterValue
 */
const checkRangeAbleTypes = (item) => {
    switch (typeof item) {
    case 'string':
        return 'string';
    case 'number':
        return 'number';
    case 'object':
        if (item instanceof Date) {
            return 'date';
        }
        return null;
    default:
        return null;
    }
};

/**
 * Validation if possible to static type item
 * @param {any} item
 * @return {boolean} true when it's possible to retype
 * @memberOf FilterValue
 */
const validStaticType = item => staticTypes.some(key => key === item);

export {
    checkPrimitiveType,
    checkRangeAbleTypes,
    validStaticType
};
