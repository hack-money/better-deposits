module.exports = {
  env: {
      es6: true,
      browser: true,
      jest: true
  },
  extends: [
      "airbnb-base",
      "plugin:react/recommended",
    //   "plugin:@typescript-eslint/recommended",
    //   "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
      "plugin:prettier/recommended" // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
      sourceType: "module",
      ecmaFeatures: {
          jsx: true
      }
  },
  plugins: [
      "@typescript-eslint",
  ],
  rules: {
      "spaced-comment": ["error", "always", { "markers": ["/"] }],
      "import/extensions": [
          "error",
          "ignorePackages",
          {
            "js": "never",
            "jsx": "never",
            "ts": "never",
            "tsx": "never"
          }
      ],
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/prop-types": "warn",
      "import/prefer-default-export": "off",
      "@typescript-eslint/no-unused-vars": [
        "error"
      ]
  },                                                            
  settings: {
      react: {
          version: "detect"
      },
      'import/resolver': {
          node: {
              paths: ["src", "node_modules"],
              extensions: ['.js', '.jsx','.ts', '.tsx', '.d.ts']
          },
      },
  }
};
