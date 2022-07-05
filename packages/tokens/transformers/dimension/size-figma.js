module.exports = {
  type: 'value',
  matcher: token => token.attributes.category === 'dimension' && token.attributes.type === 'size',
  transformer: token => `${token.value}px`,
};
