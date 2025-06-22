module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "react/react-in-jsx-scope": "off", // For React 17+
    "no-unused-vars": "warn",          // Warn on unused variables
  },
  settings: {
    react: {
      version: "detect", // Auto-detect React version
    },
  },
};