import React, { FC, useState } from "react";
import Head from "next/head";
import { Container } from "@mui/material";
import { SearchBar } from "@/components";
import withAuth from "@/auth/withAuth";
import styled from "@emotion/styled";

const Dashboard: FC = () => {
  const [query, setQuery] = useState("");
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
          <SearchBar query={query} setQuery={setQuery} />
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
