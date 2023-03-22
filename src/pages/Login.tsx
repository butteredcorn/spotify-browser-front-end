import React, { FC, useState } from "react";
import Head from "next/head";
import { Container } from "@mui/material";
import { LoginButton } from "@/components";
import styled from "@emotion/styled";

const Login: FC = () => {
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
          <LoginButton />
        </Container>
      </Main>
    </>
  );
};

export default Login;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
`;

const Main = styled.main`
  height: 100vh;
`;
