import typescriptEslintParser from "@typescript-eslint/parser";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import stylisticEslintPlugin from "@stylistic/eslint-plugin";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginModulesNewlines from "eslint-plugin-modules-newlines";
import globals from "globals";
import "eslint-import-resolver-typescript";
import eslintPluginPrettier from "eslint-plugin-prettier";


/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.ts", "**/*.js"],
    ignores: ["dist/**", "**/templates"],
    languageOptions: {
      parser: typescriptEslintParser,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      import: eslintPluginImport,
      "modules-newlines": eslintPluginModulesNewlines,
      "@stylistic": stylisticEslintPlugin,
      "prettier": eslintPluginPrettier
    },
    rules: {
      ...typescriptEslintPlugin.configs["eslint-recommended"].overrides[0].rules,
      ...typescriptEslintPlugin.configs.recommended.rules,
      "import/no-unresolved": "error",
      "import/no-namespace": "error",
      "modules-newlines/import-declaration-newline": "error",
      "modules-newlines/export-declaration-newline": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      semi: "error",
      "no-extra-semi": "error",
      "@typescript-eslint/explicit-member-accessibility": "error",
      "prettier/prettier": "error"
    },
    settings: {
      "import/resolver": {
        typescript: {}
      }
    }
  }
];
