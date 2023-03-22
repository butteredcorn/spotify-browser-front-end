import { GraphQLResponse, GraphQLError } from "graphql-request/build/esm/types";
import { gql } from "graphql-request";
import { useQuery } from "@tanstack/react-query";

import { gqlRequestClient } from "../../graphql";

export type GetUserResponse = {
  user: { id: string; name: string; email: string };
};

const getUserResponseCacheKey = (id: string) => ["user", id];

const getUserQuery = (id: string) => gql`query GetUser {
    user(id: ${id}) {
        id
        name
        email
    }
}`;

export const useGetUser = (id: string) => {
  const query = useQuery<
    GraphQLResponse<GetUserResponse>,
    GraphQLError,
    GetUserResponse["user"]
  >(
    getUserResponseCacheKey(id),
    async ({ signal }) => {
      return gqlRequestClient.request({ document: getUserQuery(id), signal });
    },
    {
      select: (response) => response.user as GetUserResponse["user"]
    }
  );

  return [query.data, query] as const;
};
