import js from "@eslint/js";
import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends("eslint:recommended"),

  // Arquivos JS em geral
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

  // Arquivos Cypress
  {
    files: ["cypress/**/*.{js,mjs}"],
    plugins: {
      cypress: compat.plugins?.cypress,
    },
    languageOptions: {
      globals: {
        ...globals.mocha,
        cy: "readonly",
        Cypress: "readonly",
      },
    },
  },

  // Config CommonJS
  {
    files: ["cypress.config.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
];
