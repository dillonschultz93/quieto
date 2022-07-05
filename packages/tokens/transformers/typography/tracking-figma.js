module.exports = {
  type: 'value',
  matcher: token => token.attributes.category === 'typography' && token.attributes.type === 'tracking',
  transformer: token => `${token.value}rem`,
};
