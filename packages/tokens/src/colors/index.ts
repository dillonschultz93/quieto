import Values from 'values.js';
import lodash from 'lodash';

interface IColors {
  red: {
    [key: string]: string;
  };
  orange: {
    [key: string]: string;
  };
  green: {
    [key: string]: string;
  };
  indigo: {
    [key: string]: string;
  };
  gray: {
    [key: string]: string;
  };
  white: string;
  black: string;
}

export const generateColorScales = (colors: IColors) => {
  const colorScale: object = {};

  Object.entries(colors).forEach(([key, value]) => {
    new Values(value).all(20.1).forEach((val, index) => {
      const mergeObj = {
        [`${key}`]: {
          [`${(index + 1) * 100}`]: val.hexString(),
        },
      };

      lodash.merge(colorScale, mergeObj);
    });
  });

  return colorScale;
};
