module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  rules: {
    indent: [2, 4],
    semi: [2, 'never'],
    quotes: [2, 'single'],
    'no-mixed-spaces-and-tabs': [2],
    'no-extra-semi': [2],
    'comma-dangle': [2, 'never']
  }
}
