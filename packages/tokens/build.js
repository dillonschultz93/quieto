/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const StyleDictionary = require('style-dictionary');
const { useRefValue } = require('@divriots/style-dictionary-to-figma');

// Set up style dictionary ====================================================
const modes = ['light', 'dark'];

// Build light mode tokens
StyleDictionary.extend({
  transform: {
    'fontSize/css': require('./transformers/typography/font-size-css'),
    'tracking/css': require('./transformers/typography/tracking-css'),
    'paragraphSpacing/css': require('./transformers/typography/paragraph-spacing-css'),
    'leading/figma': require('./transformers/typography/leading-figma'),
    'tracking/figma': require('./transformers/typography/tracking-figma'),
    'weight/figma': require('./transformers/typography/weight-figma'),
    'sizing/css': require('./transformers/dimension/size-css'),
    'spacing/css': require('./transformers/dimension/space-css'),
    'corners/css': require('./transformers/dimension/corner-css'),
    'borderWidth/css': require('./transformers/dimension/border-width-css'),
  },
  format: {
    figmaTokensPlugin: ({ dictionary }) => {
      const transformedTokens = useRefValue(dictionary.tokens);

      return JSON.stringify(transformedTokens, null, 2);
    },
  },
  source: [`src/**/!(*.${modes.join(`|*.`)}).tokens.json`],
  platforms: {
    css: {
      transforms: [
        'attribute/cti',
        'name/cti/kebab',
        'time/seconds',
        'content/icon',
        'fontSize/css',
        'tracking/css',
        'paragraphSpacing/css',
        'sizing/css',
        'spacing/css',
        'corners/css',
        'borderWidth/css',
        'color/css',
      ],
      buildPath: 'lib/css/',
      files: [
        {
          destination: '_variables.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    json: {
      transforms: [
        'attribute/cti',
        'name/cti/pascal',
        'fontSize/css',
        'tracking/css',
        'paragraphSpacing/css',
        'sizing/css',
        'spacing/css',
        'corners/css',
        'borderWidth/css',
        'color/hex',
      ],
      buildPath: 'src/',
      files: [
        {
          destination: '../tmp/transformed-tokens.json',
          format: 'json/nested',
        },
      ],
    },
    figma: {
      transforms: [
        'attribute/cti',
        'name/cti/camel',
        'tracking/figma',
        'leading/figma',
        'weight/figma',
        'color/hex',
      ],
      buildPath: 'figma/',
      files: [
        {
          destination: 'figma-tokens.json',
          format: 'json',
        },
      ],
    },
  },
}).buildAllPlatforms();

// // Build dark mode tokens
StyleDictionary.extend({
  format: {
    figmaTokensPlugin: ({ dictionary }) => {
      const transformedTokens = useRefValue(dictionary.tokens);

      return JSON.stringify(transformedTokens, null, 2);
    },
  },
  include: [`src/**/!(*.${modes.join(`|*.`)}).tokens.json`],
  source: ['src/**/*.dark.tokens.json'],
  platforms: {
    dark_css: {
      transformGroup: 'css',
      buildPath: 'lib/css/',
      files: [
        {
          destination: '_dark-variables.css',
          format: 'css/variables',
          filter: token => token.filePath.indexOf('.dark.') > -1,
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    dark_json: {
      transformGroup: 'js',
      buildPath: 'src/',
      files: [
        {
          destination: '../tmp/transformed-dark-tokens.json',
          format: 'json/nested',
          filter: token => token.filePath.indexOf('.dark.') > -1,
        },
      ],
    },
    dark_figma: {
      transformGroup: 'js',
      buildPath: 'figma/',
      files: [
        {
          destination: 'dark-figma-tokens.json',
          format: 'json',
        },
      ],
    },
  },
}).buildAllPlatforms();

// =============================================================================

// Take style-dictionary output and merge the two tokensets
const tokens = require('./tmp/transformed-tokens.json');
const darkTokens = require('./tmp/transformed-dark-tokens.json');

let transformedTokens = { ...tokens };

// Compare the two tokensets
Object.entries(darkTokens).forEach(([category, categoryValue]) => {
  if (category in tokens) {
    // Check if the category is either color of component
    if (category === 'color' || category === 'component') {
      transformedTokens = {
        ...transformedTokens,
        [category]: {},
      };
      // Loop once more through to get the type of the token
      Object.entries(categoryValue).forEach(([type, typeValue]) => {
        if (type in tokens[category]) {
          transformedTokens[category] = {
            ...transformedTokens[category],
            [type]: {
              dark: typeValue,
              light: tokens[category][type],
            },
          };
        }
      });
    }
  }
});

fs.writeFileSync('./src/tokens.json', JSON.stringify(transformedTokens, null, 2));
