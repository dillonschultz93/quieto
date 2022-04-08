import fs from 'fs';
import path from 'path';

const tokenFile = fs.readFileSync(path.join(__dirname, 'parsed-tokens.json'), 'utf8');
const parsedTokens = JSON.parse(tokenFile);

const QuietoDesignTokens = {
  ...parsedTokens,
};

export default QuietoDesignTokens;
