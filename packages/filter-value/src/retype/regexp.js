import regexEscape from '../regex-escape';

const regexpRetype = item => ((item instanceof RegExp) ? item : new RegExp(regexEscape(`${item}`), 'i'));


export default regexpRetype;
