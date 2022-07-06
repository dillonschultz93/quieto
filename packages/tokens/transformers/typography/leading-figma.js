module.exports = {
  type: 'value',
  matcher: token => token.attributes.category === 'typography' && token.attributes.type === 'leading',
  transformer: token => {
   if (token.value > 0) {
    return `${token.value * 100}%`
   }
  },
};
