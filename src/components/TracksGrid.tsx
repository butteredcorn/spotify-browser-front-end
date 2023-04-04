import React, { FC, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Track } from "@/models";
import { TrackCard } from "./TrackCard";
import { useAuthContext } from "@/auth";
import { useGetLyrics } from "@/api/lyrics";
import { isEmpty } from "lodash";

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

  const [lyrics, getLyricsQuery] = useGetLyrics(
    currentTrack?.name ?? "",
    !isEmpty(currentTrack?.artists)
      ? currentTrack?.artists?.[0].name ?? ""
      : "",
    {
      enabled:
        currentTrack != null &&
        !isEmpty(currentTrack.name) &&
        !isEmpty(currentTrack?.artists)
    }
  );

  return (
    <>
      <Grid container spacing={2}>
        {tracks.map((t) => (
          <TrackCard
            lyrics={
              isPremium && t.id === currentTrack?.id ? lyrics?.text : undefined
            }
            lyricsIsLoading={getLyricsQuery.isLoading}
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
