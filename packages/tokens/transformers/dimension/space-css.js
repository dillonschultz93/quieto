module.exports = {
  type: 'value',
  matcher: token => token.attributes.category === 'dimension' && token.attributes.type === 'space',
  transformer: token => `${token.value}px`,
};
