
// eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard', // github.com/standard/standard/blob/master/docs/RULES-en.md
  plugins: [
    'html' // required to lint *.vue files
  ],
  'rules': {
    'arrow-parens': 0, // allow paren-less arrow functions
    'generator-star-spacing': 0, // allow async-await
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // allow debugger during development
    'linebreak-style': [2, 'unix'],
    'quotes': [1, 'single', {"allowTemplateLiterals": true}], // allow backticks in ES6
    'indent': [1, 2], // two spaces - warn,
    'semi': [0, 'always'], // ignore missing semicolons
    'space-before-function-paren': [0, 'ignore'],
    'space-in-parens': [1, 'never'],
    'camelcase': [1, { 'properties': 'always' }],
    'no-cond-assign': [2, 'except-parens'],
    'block-spacing': [1, 'never']
  }
}
