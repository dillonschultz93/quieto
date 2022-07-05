/* eslint-disable @typescript-eslint/no-var-requires */
const fontSizes = require('../../src/typography/size.tokens.json');

const { typography } = fontSizes;
const { size } = typography;

module.exports = {
  type: 'value',
  matcher: token => token.attributes.category === 'typography' && token.attributes.type === 'size',
  transformer: token => {
    if (token.path.includes('base')) {
      return `${token.value}px`;
    } else {
      return `${(token.value / (size.base.value ? size.base.value : 18)).toFixed(2)}rem`;
    }
  },
};
