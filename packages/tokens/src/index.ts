import fs from 'fs';
import path from 'path';

const configFile = fs.readFileSync(path.join(__dirname, '../parsed-tokens.json'), 'utf8');
const parsedConfig = JSON.parse(configFile);

const QuietoDesignTokens = {
  ...parsedConfig,
};

console.log(JSON.stringify(QuietoDesignTokens, null, 2));

export default QuietoDesignTokens;
