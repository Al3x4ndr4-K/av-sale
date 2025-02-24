import globals from 'globals';
import react from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import _import from 'eslint-plugin-import';
import reactHooks from 'eslint-plugin-react-hooks';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11Y from 'eslint-plugin-jsx-a11y';

const customEslintConfig = {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    react: fixupPluginRules(react),
    prettier: fixupPluginRules(prettier),
    import: fixupPluginRules(_import),
    'react-hooks': fixupPluginRules(reactHooks),
    'react-refresh': reactRefresh,
    'jsx-a11y': jsxA11Y,
  },
  rules: {
    'prettier/prettier': 'error',
    'linebreak-style': [0, 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 0,
    'import/no-unresolved': [
      2,
      {
        caseSensitive: false,
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    react: { version: 'detect' },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};

export default [
  {
    ignores: ['**/node_modules', '**/dist', '**/build'],
  },
  ...fixupConfigRules(customEslintConfig),
];
