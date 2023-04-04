import { GraphQLResponse, GraphQLError } from "graphql-request/build/esm/types";
import { gql } from "graphql-request";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { gqlRequestClient } from "@/graphql";
import { Lyrics } from "@/models";

export type GetLyricsResponse = {
  getLyrics: Lyrics;
};

const getLyricsResponseCacheKey = (trackName: string, artist: string) => [
  "lyrics",
  trackName,
  artist
];

const getLyricsQuery = (
  trackName: string,
  artist: string
) => gql`query getLyrics {
    getLyrics(trackName: "${trackName}", artist: "${artist}") {
        id
        text
    }
}`;

export const useGetLyrics = (
  trackName: string,
  artist: string,
  options?: UseQueryOptions<
    GraphQLResponse<GetLyricsResponse>,
    GraphQLError,
    GetLyricsResponse["getLyrics"]
  >
) => {
  const query = useQuery<
    GraphQLResponse<GetLyricsResponse>,
    GraphQLError,
    GetLyricsResponse["getLyrics"]
  >(
    getLyricsResponseCacheKey(trackName, artist),
    async ({ signal }) => {
      return gqlRequestClient.request({
        document: getLyricsQuery(trackName, artist),
        signal
      });
    },
    {
      ...options,
      select: (response) => {
        return response.getLyrics as GetLyricsResponse["getLyrics"];
      }
    }
  );

  return [query.data, query] as const;
};
