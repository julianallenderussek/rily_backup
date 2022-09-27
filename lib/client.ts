import { ApolloClient, InMemoryCache } from "@apollo/client";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

const ContentClient = new ApolloClient({
  ssrMode: typeof window === "undefined",
  uri: `${process.env.NEXT_STRAPI_URL}/graphql`,
  cache: new InMemoryCache(),
});

export const getApolloClient = (ctx: any) => {
  return ContentClient;
};

export type ApolloClientContext = {
  req?: IncomingMessage & {
    cookies: NextApiRequestCookies;
  };
};

export default ContentClient;
