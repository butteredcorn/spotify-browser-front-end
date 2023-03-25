import { GraphQLClient } from "graphql-request";

export const gqlRequestClient = new GraphQLClient(
  `${process.env.NEXT_PUBLIC_WEBSERVER_BASE_URL}/graphql`,
  {
    headers: {}
  }
);
