import fs from 'fs';
import path from 'path';
import { writeTokensToJSON } from './utilities/writeTokensToJSON';
import { generateSizing } from './sizing';
import { generateColorScales } from './colors';

const configFile = fs.readFileSync(path.join(__dirname, '../config.json'), 'utf8');
const parsedConfig = JSON.parse(configFile);

const { sizing, typography, colors } = parsedConfig;

const tokens = {
  spaces: generateSizing(sizing),
  typography: {
    ...typography,
  },
  colors: {
    ...generateColorScales(colors),
    white: '#ffffff',
    black: '#000000',
  },
};

writeTokensToJSON(tokens);

export default tokens;
