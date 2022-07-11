/* eslint-disable @typescript-eslint/no-var-requires */
const tinycolor = require('tinycolor2');

module.exports = {
  type: 'value',
  matcher: token => token.attributes.category === 'misc' && token.attributes.type === 'elevation',
  transformer: token => {
    const boxShadowValue = token.value.map(val => {
      return `${val.x}px ${val.y}px ${val.blur}px ${tinycolor(val.color).toRgbString()}`
    });

    return boxShadowValue.join(', ');
  }
}
