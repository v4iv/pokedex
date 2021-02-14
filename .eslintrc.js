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
    "@typescript-eslint/ban-types": "off",
    "react/no-unescaped-entities": "off",
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "prettier/prettier": [
        "error",
      {
        "endOfLine": "auto",
        "semi": false
      }
    ]
  }
}
