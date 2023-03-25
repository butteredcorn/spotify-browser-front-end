import { GraphQLResponse, GraphQLError } from "graphql-request/build/esm/types";
import { gql } from "graphql-request";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { gqlRequestClient } from "../../graphql";

interface Track {
  id: string;
  name: string;
}

export type GetTracksResponse = {
  getTracks: Track[];
};

const getTracksResponseCacheKey = (query: string) => ["track", query];

const getTracksQuery = (query: string) => gql`query getTracks {
    getTracks(query: "${query}") {
        id
        name
        artists {
          id
          name
        }
        uri
        popularity
        images {
          url
          width
          height
        }
        album {
          id
          name
        }
    }
}`;

export const useGetTracks = (
  searchQuery: string,
  options?: UseQueryOptions<
    GraphQLResponse<GetTracksResponse>,
    GraphQLError,
    GetTracksResponse["getTracks"]
  >
) => {
  const query = useQuery<
    GraphQLResponse<GetTracksResponse>,
    GraphQLError,
    GetTracksResponse["getTracks"]
  >(
    getTracksResponseCacheKey(searchQuery),
    async ({ signal }) => {
      return gqlRequestClient.request({
        document: getTracksQuery(searchQuery),
        signal
      });
    },
    {
      ...options,
      select: (response) => response.getTracks as GetTracksResponse["getTracks"]
    }
  );

  return [query.data, query] as const;
};
