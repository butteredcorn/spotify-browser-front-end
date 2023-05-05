import React, { FC, useState } from "react";
import Head from "next/head";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiGitHubIcon from "@mui/icons-material/GitHub";
import { LoginButton } from "@/components";
import emotionStyled from "@emotion/styled";

const Login: FC = () => {
  return (
    <>
      <Head>
        <title>Spotify Browser</title>
      </Head>
      <Main>
        <Container maxWidth="md">
          <Header>
            <Typography variant="h2">Spotify Browser</Typography>
          </Header>
          <Content>
            <IntroContainer maxWidth="sm">
              <Typography variant="body1">
                Welcome to Spotify Browser, a work sample built with TypeScript,
                Next.js, React Queries, GraphQL, NestJS, and more. To browse
                with full functionality, you will need to login with a premium
                spotify account.
              </Typography>
            </IntroContainer>
            <ButtonContainer>
              <LoginButton />
            </ButtonContainer>
            <IconButton
              onClick={() => {
                const newWindow = window.open(
                  "https://github.com/butteredcorn/spotify-browser-front-end",
                  "_blank",
                  "noopener,noreferrer"
                );
                if (newWindow) newWindow.opener = null;
              }}
            >
              <GitHubIcon />
            </IconButton>
          </Content>
        </Container>
      </Main>
    </>
  );
};

export default Login;

const Header = emotionStyled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  height: 300px;
`;

const Main = emotionStyled.main`
  height: 100vh;
`;

const Content = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IntroContainer = styled(Box)`
  margin-bottom: 4rem;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: center;
  margin-bottom: 8rem;
  cursor: pointer;
`;

const GitHubIcon = styled(MuiGitHubIcon)`
  width: 64px;
  height: 64px;
`;
