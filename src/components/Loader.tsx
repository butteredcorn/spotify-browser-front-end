import React, { FC } from "react";
import { Box, CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

interface LoaderProps {
  size?: number | string;
}

export const Loader: FC<LoaderProps> = ({ size = 64 }) => {
  return (
    <Container>
      <CircularProgress size={size} />
    </Container>
  );
};

const Container = styled(Box)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
