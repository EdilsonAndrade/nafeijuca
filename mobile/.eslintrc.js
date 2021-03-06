module.exports = {
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension':['warn', {extensions: ['.jsx', '.js']}],
    "no-param-reassign": "off",
    "camelcase": "off",
  },
  settings:{
    "import/resolver":{
      "babel-plugin-root-import":{
          rootPathSuffix: "src"
        }
    }
  },
};
