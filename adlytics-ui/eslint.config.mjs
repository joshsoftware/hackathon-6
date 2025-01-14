export default {
  root: true,
  env: {browser: true, es2020: true},
  extends: [
    './node_modules/gts/',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    'node/no-unpublished-import': 'off',
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],  
    '@typescript-eslint/no-unused-vars': ['warn', {varsIgnorePattern: '^_'}],
  },
};
