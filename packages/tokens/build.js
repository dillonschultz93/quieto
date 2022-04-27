/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const separateTokens = require('./util/separate-tokens');

// Set up style dictionary ====================================================
const StyleDictionary = require('style-dictionary').extend({
  "source": ["src/**/*.tokens.json"],
  "platforms": {
    "js": {
      "transformGroup": "js",
      "buildPath": "lib/js/",
      "files": [
        {
          "destination": "index.js",
          "format": "javascript/es6"
        }
      ]
    },
    "ts": {
      "transformGroup": "js",
      "buildPath": "lib/js/",
      "files": [
        {
          "destination": "index.d.ts",
          "format": "typings/es6"
        }
      ]
    },
    "css": {
      "transformGroup": "css",
      "buildPath": "lib/css/",
      "files": [
        {
          "destination": "_variables.css",
          "format": "css/variables"
        }
      ]
    }
  }
});

// Create a custom formatter for style dictionary
const templateFile = fs.readFileSync(path.join(__dirname, 'templates/es6.template'), 'utf-8');
const typingES6Template = _.template(templateFile);

StyleDictionary.registerFormat({
  name: 'typings/es6',
  formatter: typingES6Template
});
// =============================================================================

function moveRawTokens() {
  // Build all platforms.
  StyleDictionary.buildAllPlatforms();

  // Put raw tokens into the lib directory.
  fs.readdirSync(path.join(__dirname, 'tmp/')).forEach(file => {
    fs.copyFileSync(path.join(__dirname, 'tmp/', file), path.join(__dirname, 'lib/', file));
  });
}

separateTokens();
moveRawTokens();