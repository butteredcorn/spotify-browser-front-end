import React, { FC } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Track } from "@/models";
import { TrackCard } from "./TrackCard";
import { useAuthContext } from "@/auth";

interface TracksGridProps {
  currentTrack: Track | null;
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}

export const TracksGrid: FC<TracksGridProps> = ({
  currentTrack,
  tracks,
  onSelectTrack
}) => {
  const { isPremium } = useAuthContext();

  return (
    <>
      <Grid container spacing={2}>
        {tracks.map((t) => (
          <TrackCard
            key={t.id}
            track={t}
            isPlaying={isPremium && t.id === currentTrack?.id}
            onClick={onSelectTrack}
          />
        ))}
      </Grid>
    </>
  );
};
