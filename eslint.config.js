const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');

// Import typescript-eslint properly
const typescript = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  js.configs.recommended,
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:react/recommended'),
  ...compat.extends('plugin:react-hooks/recommended'),
  prettierConfig,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        window: true,
        document: true,
        navigator: true,
        console: true
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': require('eslint-plugin-react'),
      'unused-imports': require('eslint-plugin-unused-imports')
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' }
      ],
      'unused-imports/no-unused-imports': 'error'
    }
  }
];