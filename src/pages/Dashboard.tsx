import React, { FC, useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Container } from "@mui/material";
import { isEmpty } from "lodash";
import { SearchBar } from "@/components";
import withAuth from "@/auth/withAuth";
import styled from "@emotion/styled";
import { useGetTracks } from "@/api";

const Dashboard: FC = () => {
  const [query, setQuery] = useState("");
  const [getTracks, getTrackQuery] = useGetTracks(query, { enabled: false });

  const searchTracks = useCallback(async () => {
    if (isEmpty(query)) return; // todo: give some indication to add query
    const response = await getTrackQuery.refetch();
    console.log(response);
  }, [getTrackQuery, query]);

  useEffect(() => {
    console.log(getTracks);
  }, [getTracks]);

  return (
    <>
      <Head>
        <title>Spotify Browser</title>
      </Head>
      <Main>
        <Header>
          <h1>Spotify Browser</h1>
        </Header>
        <Container maxWidth="xl">
          <SearchBar query={query} setQuery={setQuery} onClick={searchTracks} />
        </Container>
      </Main>
    </>
  );
};

export default withAuth(Dashboard);

const Wrapper = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
`;

const Main = styled.main`
  height: 100vh;
`;
