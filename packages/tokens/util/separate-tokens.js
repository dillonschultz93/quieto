/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

// Separates the parsed tokens into separate json files. This is help when running them through style dictionary.
function separateTokens() {
  const tokenFile = fs.readFileSync(path.join(__dirname, '../src/parsed-tokens.json'), 'utf8');
  const parsedTokens = JSON.parse(tokenFile);
  // Loop through the parsed tokens.
  Object.entries(parsedTokens).forEach(([key, value]) => {
    
    // Check if the directory exists. If not, create it.
    fs.existsSync(path.join(__dirname, `../src/${key}/`)) ? console.log(`${key}/ already exists`) : fs.mkdirSync(path.join(__dirname, `../src/${key}/`), { recursive: true });
    
    // Write the content of the tokens files.
    const content = `{
  "${key}": ${JSON.stringify(value, null, 2)}
}`
    // Write the separate tokens to the file.
    fs.writeFileSync(path.join(__dirname, `../src/${key}/${key}.tokens.json`), content, 'utf8');
  });
}

module.exports = separateTokens;