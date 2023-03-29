import React, { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Track } from "@/models";
import { TrackCard } from "./TrackCard";
import { searchIconWidth } from "./SearchBar";

interface TracksGridProps {
  tracks: Track[];
}

export const TracksGrid: FC<TracksGridProps> = ({ tracks }) => {
  return (
    <>
      <Grid container spacing={2} paddingRight={searchIconWidth / 8}>
        {tracks.map((t) => (
          <TrackCard key={t.id} track={t} />
        ))}
      </Grid>
    </>
  );
};
