module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:solid/typescript',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [ 'solid','simple-import-sort' ],
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    "@typescript-eslint/indent": [ "error", 2 ],
    "@typescript-eslint/no-non-null-assertion": "off",
    paddedBlocks: 'off',
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "array-bracket-spacing": [ 'error', 'always' ],
    "object-curly-spacing": [ 'error', 'always' ],
  },
};
