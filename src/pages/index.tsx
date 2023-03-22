import React, { FC } from "react";
import { CssBaseline } from "@mui/material";
import Dashboard from "./Dashboard";
import withAuth from "@/auth/withAuth";

const Home: FC = () => {
  return (
    <>
      <CssBaseline />
      <Dashboard />
    </>
  );
};

export default withAuth(Home);
