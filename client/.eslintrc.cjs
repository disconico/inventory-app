module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  ignorePatterns: ['*.test.js'],
  rules: {
    quotes: ['error', 'single'],
    'no-unused-vars': ['warn', { vars: 'local' }],
  },
};
