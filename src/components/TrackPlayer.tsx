import { useAuthContext } from "@/auth";
import { FC, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

interface TrackPlayerProps {
  trackUri?: string;
}

export const TrackPlayer: FC<TrackPlayerProps> = ({ trackUri }) => {
  const { accessToken } = useAuthContext();
  const [play, setPlay] = useState(false);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      // showSaveIcon
      token={accessToken}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
};
