import { GraphQLClient } from "graphql-request";

export const gqlRequestClient = new GraphQLClient(
  process.env.REACT_APP_GQL_URI!,
  {
    headers: {
      // authorization: "Ie. BEARER_TOKEN"
    }
  }
);
