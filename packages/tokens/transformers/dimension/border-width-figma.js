module.exports = {
  type: 'value',
  matcher: token => token.attributes.category === 'dimension' && token.attributes.type === 'borderWidth',
  transformer: token => `${token.value}px`,
};
