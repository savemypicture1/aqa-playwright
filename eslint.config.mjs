import js from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import noOnlyTests from "eslint-plugin-no-only-tests";
import promise from "eslint-plugin-promise";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/",
      "playwright-report/",
      "test-results/",
      "state/",
      "*.config.js",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      promise,
      import: pluginImport,
      "no-only-tests": noOnlyTests,
    },
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-empty-pattern": ["error", { allowObjectPatternsAsParameters: true }],
      "require-await": "error",
      "no-async-promise-executor": "error",
      "no-promise-executor-return": "error",
      "no-implicit-coercion": "error",
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2, { SwitchCase: 1 }],
      "comma-dangle": ["error", "always-multiline"],
      "arrow-spacing": "error",
      "no-duplicate-imports": "error",
      "promise/no-return-wrap": "error",
      "prefer-promise-reject-errors": "error",
      "no-only-tests/no-only-tests": "error",
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "never",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ["tests/**/*.{js,ts}"],
    languageOptions: {
      globals: {
        test: "readonly",
        expect: "readonly",
      },
    },
  },
];
