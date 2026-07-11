// eslint-config-next 14 は flat config を同梱しないため、FlatCompat経由で読み込む。
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig, globalIgnores } from "eslint/config";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = defineConfig([
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Pages Routerの_document専用ルール。同梱版がESLint 9非対応でクラッシュするため無効化。
      "@next/next/no-duplicate-head": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
