import React, { ChangeEvent, FC, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ query, setQuery }) => (
  <>
    <TextField
      id="search-bar"
      className="text"
      value={query}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
      }}
      label="Enter a search query"
      variant="outlined"
      placeholder="Search..."
      size="small"
      sx={{
        width: "calc(100% - 40px)"
      }}
    />
    <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton>
  </>
);
