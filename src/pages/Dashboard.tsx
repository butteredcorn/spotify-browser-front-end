import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Container } from "@mui/material";
import { Login } from "@/components";
import styled from "@emotion/styled";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Spotify Browser</title>
      </Head>
      <Main>
        <Container maxWidth="xl">
          test test
          <Login />
        </Container>
      </Main>
    </>
  );
}

const Main = styled.main`
  height: 100vh;
`;
