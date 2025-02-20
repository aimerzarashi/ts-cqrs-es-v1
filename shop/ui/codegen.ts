
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://shop-query:5000/graphql",
  documents: ["components/**/*.ts", "app/**/*.tsx"],
  generates: {
    "schemas/graphql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
