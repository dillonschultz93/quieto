import fs from 'fs';
import path from 'path';

interface ITokens {
  spaces?: {
    [key: string]: number;
  };
  colors?: {
    [key: string]: string;
  };
  typography?: {
    [key: string]: string | number;
  };
}

export const writeTokensToJSON = (tokens: ITokens) => {
  const data = JSON.stringify(tokens, null, 2);

  fs.mkdirSync(path.resolve('lib/'), { recursive: true });

  fs.writeFileSync(path.resolve('lib/tokens.json'), data);

  console.log('Tokens written to tokens.json 💾');
};
