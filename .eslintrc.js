module.exports = {
  extends: [
      "airbnb-typescript",
      "airbnb/hooks",
      "plugin:@typescript-eslint/recommended",
      "plugin:jest/recommended",
      "prettier",
      "prettier/react",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended"
  ],
  plugins: [ "react", "@typescript-eslint", "jest" ],
  env: {
    "browser": true,
    "es6": true,
    "jest": true
  },
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  rules: {
    "semi": "off",
    "linebreak-style": "off",
    "no-console": "off",
    "consistent-return": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/no-array-index-key": "off",
    "@typescript-eslint/ban-types": "off",
    "no-underscore-dangle": "off",
    "react/no-unescaped-entities": "off",
    "react/button-has-type": "off",
    "import/prefer-default-export": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "prettier/prettier": [
        "error",
      {
        "endOfLine": "auto",
        "semi": false
      }
    ]
  }
}
