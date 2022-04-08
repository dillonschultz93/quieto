import fs from 'fs';
import path from 'path';

const configFile = fs.readFileSync(path.join(__dirname, '../parsed-tokens.json'), 'utf8');
const parsedConfig = JSON.parse(configFile);

const QuietoDesignTokens = {
  ...parsedConfig,
};

export default QuietoDesignTokens;
