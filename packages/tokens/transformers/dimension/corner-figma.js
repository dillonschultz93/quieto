module.exports = {
  type: 'value',
  matcher: token => token.attributes.category === 'dimension' && token.attributes.type === 'corner',
  transformer: token => `${token.value}px`,
};
