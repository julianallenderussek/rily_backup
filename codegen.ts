import { CodegenConfig } from "@graphql-codegen/cli";
const STRAPI_URL = process.env.NEXT_STRAPI_URL || "http://localhost:1337";

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    "./src/generated/editorial-graphql.ts": {
      schema: `https://editorial.rily.co/graphql`,
      documents: ["src/queries/editorial/*.graphql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        reactApolloVersion: 3,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        exportFragmentSpreadSubTypes: true,
        documentMode: "graphQLTag",
      },
    },
    "./src/generated/editorial.tsx": {
      schema: "https://editorial.rily.co/graphql",
      documents: ["src/queries/editorial/*.graphql"],
      plugins: ["graphql-codegen-apollo-next-ssr"],
      preset: "import-types-preset",
      presetConfig: {
        typesPath: "./editorial-graphql",
      },
      config: {
        documentMode: "external",
        importDocumentNodeExternallyFrom: "./editorial-graphql",
        reactApolloVersion: 3,
        withHooks: true,
        contextType: "ApolloClientContext",
        contextTypeRequired: true,
        apolloClientInstanceImport: `${__dirname}/lib/client`,
      },
    },
    "./src/generated/content-graphql.ts": {
      schema: `${STRAPI_URL}/graphql`,
      documents: ["src/queries/content/*.graphql"],
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        reactApolloVersion: 3,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        exportFragmentSpreadSubTypes: true,
        documentMode: "graphQLTag",
      },
    },
    "./src/generated/content.tsx": {
      schema: `${STRAPI_URL}/graphql`,
      documents: ["src/queries/content/*.graphql"],
      plugins: ["graphql-codegen-apollo-next-ssr"],
      preset: "import-types-preset",
      presetConfig: {
        typesPath: "./content-graphql",
      },
      config: {
        documentMode: "external",
        importDocumentNodeExternallyFrom: "./content-graphql",
        reactApolloVersion: 3,
        withHooks: true,
        contextType: "ApolloClientContext",
        contextTypeRequired: true,
        apolloClientInstanceImport: `${__dirname}/lib/client`,
      },
    },
  },
};

export default config;
