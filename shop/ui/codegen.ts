
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://shop-query:5000/graphql",
  documents: ["app/**/*.tsx", "app/**/*.ts"],
  generates: {
    "schemas/graphql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
