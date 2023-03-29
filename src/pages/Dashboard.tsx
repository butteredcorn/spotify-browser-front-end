import React, { FC, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Container, Typography } from "@mui/material";
import { SearchBar } from "@/components";
import { isEmpty } from "lodash";
import withAuth from "@/auth/withAuth";
import styled from "@emotion/styled";
import { useGetTracks } from "@/api";
import { TracksGrid } from "@/components/TracksGrid";
import { Track } from "@/models";
import { TrackPlayer } from "@/components/TrackPlayer";
import { useAuthContext } from "@/auth";
import { useErrorSnackBar } from "@/shared";

const Dashboard: FC = () => {
  const { isPremium } = useAuthContext();
  const createSnackBarError = useErrorSnackBar();
  const [query, setQuery] = useState("");
  const [tracks, getTrackQuery] = useGetTracks(query, { enabled: false });
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  const searchTracks = useCallback(async () => {
    if (isEmpty(query)) return; // todo: give some indication to add query
    await getTrackQuery.refetch();
  }, [getTrackQuery, query]);

  useEffect(() => {
    if (!isPremium)
      createSnackBarError(
        "The web player is only available for premium spotify users, and has been disabled."
      );
  }, [isPremium, createSnackBarError]);

  useEffect(() => {
    console.log("current track is " + currentTrack?.name);
  }, [currentTrack]);

  return (
    <>
      <Head>
        <title>Spotify Browser</title>
      </Head>
      <Main>
        <Container maxWidth="xl">
          <Header>
            <Typography variant="h2">Spotify Browser</Typography>
          </Header>
          <SearchBarContainer>
            <SearchBar
              query={query}
              setQuery={setQuery}
              onClick={searchTracks}
            />
          </SearchBarContainer>
          <TracksGrid tracks={tracks ?? []} onSelectTrack={setCurrentTrack} />
          {isPremium && <TrackPlayer trackUri={currentTrack?.uri} />}
        </Container>
      </Main>
    </>
  );
};

export default withAuth(Dashboard);

const SearchBarContainer = styled.div`
  margin-bottom: 1rem;
`;

const Header = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Main = styled.main`
  height: 100vh;
`;
