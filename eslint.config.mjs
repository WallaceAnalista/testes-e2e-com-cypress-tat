import js from "@eslint/js";
import globals from "globals";
import cypress from "eslint-plugin-cypress";

export default [
  js.configs.recommended,

  // JS geral
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Cypress specs e support
  {
    files: ["cypress/**/*.{js,mjs}"],
    plugins: {
      cypress,
    },
    languageOptions: {
      globals: {
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
      },
    },
    rules: {
      "cypress/no-unnecessary-waiting": "off",
    },
  },

  // Config principal em CommonJS
  {
    files: ["cypress.config.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
];
