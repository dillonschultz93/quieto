module.exports = {
  type: 'value',
  matcher: token => token.attributes.category === 'typography' && token.attributes.type === 'weight',
  transformer: token => {
    switch (token.value) {
      case 300:
        return 'Light';

      case 400:
        return 'Regular';

      case 700:
        return 'Bold';

      default:
        return 'Regular';
    }
  },
};
