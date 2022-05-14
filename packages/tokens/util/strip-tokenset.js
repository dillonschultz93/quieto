const stripTokenset = (obj) => {
  const _obj = { ...obj };

  Object.keys(_obj).forEach(key => {
    if (typeof _obj[key] === 'object') {
      const nestedObj = _obj[key];

      Object.keys(nestedObj).forEach(nestedKey => {
        if (nestedKey === 'tokenset') {
          delete _obj[key][nestedKey];
        }
      });
    }
  });

  return _obj;
};

module.exports = stripTokenset;
