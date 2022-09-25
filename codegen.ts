import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "./src/generated/editorial.ts": {
      schema: "https://editorial.rily.co/graphql",
      documents: ["src/queries/editorial/*.graphql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
    "./src/generated/content.ts": {
      schema: "https://content.rily.co/graphql",
      documents: ["src/queries/content/*.graphql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
