import React, { ChangeEvent, FC, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import MuiSearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onClick: () => void;
}

export const searchIconWidth = 40;

export const SearchBar: FC<SearchBarProps> = ({ query, setQuery, onClick }) => (
  <>
    <TextField
      id="search-bar"
      className="text"
      value={query}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setQuery(String(e.target.value).trim());
      }}
      label="Enter a search query"
      variant="outlined"
      placeholder="Search..."
      size="small"
      sx={{
        width: `calc(100% - ${searchIconWidth}px)`
      }}
      onKeyDown={(e) => {
        // deprecated but not all browsers support code
        if (e.code === "13" || e.keyCode === 13) onClick();
      }}
    />
    <IconButton type="submit" aria-label="search" onClick={onClick}>
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </>
);

const SearchIcon = styled(MuiSearchIcon)`
  fill: blue;
`;
