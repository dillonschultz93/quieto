/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { transform } = require('@divriots/style-dictionary-to-figma');
const stripTokenset = require('./util/strip-tokenset');

// Set up style dictionary ====================================================
const StyleDictionary = require('style-dictionary').extend({
  "source": ["src/**/*.tokens.json"],
  "format": {
    figmaTokensPluginJson: ({ dictionary }) => {
      const transformedTokens = transform(dictionary.tokens);

      return JSON.stringify(transformedTokens, null, 2);
    }
  },
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
          "destination": "_tokens.css",
          "format": "css/variables",
          options: {
            outputReferences: true
          }
        }
      ]
    },
    "scss": {
      "transformGroup": "css",
      "buildPath": "lib/scss/",
      "files": [
        {
          "destination": "_tokens.scss",
          "format": "scss/variables",
          options: {
            outputReferences: true
          }
        }
      ]
    },
    "json": {
      "transformGroup": "js",
      "buildPath": "src/",
      "files": [
        {
          "destination": "../tmp/transformed-tokens.json",
          "format": "json/nested"
        }
      ]
    },
    "figma": {
      "transformGroup": "js",
      "buildPath": "figma/",
      "files": [
        {
          "destination": "figma-tokens.json",
          "format": "figmaTokensPluginJson"
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

StyleDictionary.buildAllPlatforms();

// Strip the `tokenset` property from the transformed tokens
const transformedTokens = require('./tmp/transformed-tokens.json');
const strippedTokens = stripTokenset(transformedTokens);

fs.writeFileSync('./src/tokens.json', JSON.stringify(strippedTokens, null, 2));
