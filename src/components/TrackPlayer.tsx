import { useAuthContext } from "@/auth";
import styled from "@emotion/styled";
import { FC, useCallback, useEffect, useState } from "react";
import SpotifyPlayer, { CallbackState } from "react-spotify-web-playback";

interface TrackPlayerProps {
  trackUri?: string;
}

export const TrackPlayer: FC<TrackPlayerProps> = ({ trackUri }) => {
  const { accessToken } = useAuthContext();
  const [play, setPlay] = useState(false);

  const stopPlaying = useCallback((state: CallbackState) => {
    if (!state.isPlaying) setPlay(false);
  }, []);

  useEffect(() => {
    if (trackUri) setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <Container>
      <SpotifyPlayer
        showSaveIcon
        token={accessToken}
        callback={stopPlaying}
        play={play}
        uris={trackUri ? [trackUri] : []}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
