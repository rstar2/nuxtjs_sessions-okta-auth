module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    "consistent-return":"error",
    "indent"           : ["warn", 2,  { "SwitchCase": 1 }],
    "semi"             : ["warn", "always"],
    "quotes"           : ["error", "single"],
    "no-else-return"   : "warn",
    "space-unary-ops"  : "error",
    "no-console"       : "warn",
    "no-var"           : "warn"
  }
}
