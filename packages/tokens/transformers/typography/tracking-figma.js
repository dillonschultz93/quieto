module.exports = {
  type: 'value',
  matcher: token => token.attributes.category === 'typography' && token.attributes.type === 'tracking',
  transformer: token => {
   if (token.value === 0) {
    return '0%'
   } if (token.value < 0 || token.value > 0) {
    return `${token.value * 100}%`
   }
  },
};
