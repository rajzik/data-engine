import regexEscape from '../regex-escape';

const regexpRetype = item => new RegExp(regexEscape(`${item}`), 'i');

export default regexpRetype;
