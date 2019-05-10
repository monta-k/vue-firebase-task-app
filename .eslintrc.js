module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: [
    'airbnb',
    'plugin:vue/essential',
  ],
  plugins: [
    'vue',
  ],
  rules: {
    'max-len': ['off'],
    'max-lines': ['off'],
    semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
    'semi-spacing': ['error', { after: true, before: false }],
    'semi-style': ['error', 'first'],
    'no-extra-semi': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-shadow': ['error', { allow: ['state'] }],
    'no-param-reassign': ['error', { props: false }],
    'import/no-extraneous-dependencies': ['off'],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: require.resolve('@vue/cli-service/webpack.config.js'),
      },
    },
  },
}
