import {
    regexpCompare,
    arrayCompare,
    basicCompare,
    basicCompareWithType,
    dateCompare,
    dateCompareWithType,
    funcCompare,
    rangeCompare
} from '../comparers';

import {
    numberRetype,
    stringRetype,
    booleanRetype,
    regexpRetype,
    dateRetype
} from '../retype';


const number = 'number';
const string = 'string';
const boolean = 'boolean';
const fce = 'function';


const staticTypes = [number, string, boolean, 'regexp', 'date'];

const primitiveTypes = {
    number,
    string,
    boolean,
    function: fce,
};

/**
 * Basic types of testable items.
 * Enum for data types
 *
 */

const types = {
    boolean: basicCompare,
    string: basicCompare,
    number: basicCompare,
    null: basicCompare,
    date: dateCompare,
    array: arrayCompare,
    regexp: regexpCompare,
    function: funcCompare,
    range: rangeCompare,
};

const typesWithRetype = {
    boolean: basicCompare,
    string: basicCompareWithType(stringRetype),
    number: basicCompareWithType(numberRetype),
    null: basicCompare,
    date: dateCompareWithType(dateRetype),
    array: arrayCompare,
    regexp: regexpCompare,
    function: funcCompare,
    range: rangeCompare,
};

const retype = {
    number: numberRetype,
    string: stringRetype,
    boolean: booleanRetype,
    regexp: regexpRetype,
    date: dateRetype,
};

export {
    staticTypes,
    primitiveTypes,
    typesWithRetype,
    types,
    retype
};
