module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:solid/typescript',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'solid', 'simple-import-sort', 'prettier'],
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'import/prefer-default-export': 'off',
    'prettier/prettier': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    paddedBlocks: 'off',
    'consistent-return': 'off',
    'no-nested-ternary': 'off',
  },
};
