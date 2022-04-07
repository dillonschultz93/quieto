import { scaleA, scaleB } from '../utilities/scale';

interface ISizing {
  base: number;
  ratio: number;
  scales: string[];
}

export const generateSizing = (sizingOptions: ISizing) => {
  const { base, ratio, scales } = sizingOptions;
  let sizing = {};
  let breakpoint = {};
  const min = 100;
  let max = 2000;

  scales.forEach(scale => {
    if (scale === 'md') {
      max = 6300;
    }

    for (let index = min; index < max + 1; index += 100) {
      let scaleValue = 0;

      switch (scale) {
        case 'sm':
          scaleValue = scaleA(base, ratio, index);
          breakpoint = {
            ...breakpoint,
            [index]: scaleValue,
          };
          break;

        case 'md':
          scaleValue = scaleB(base, ratio, index);
          breakpoint = {
            ...breakpoint,
            [index]: scaleValue,
          };
          break;

        default:
          break;
      }

      sizing = {
        ...sizing,
        [scale]: {
          ...breakpoint,
        },
      };
    }
  });

  return sizing;
};
