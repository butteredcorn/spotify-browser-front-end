import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { isEmpty, sample } from "lodash";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardMedia,
  Typography
} from "@mui/material";
import MuiPlayIcon from "@mui/icons-material/PlayCircleOutline";
import { Track, Image } from "@/models";
import { useAuthContext } from "@/auth";
import { css } from "@emotion/css";
import { Loader } from "./Loader";

interface TrackCardProps {
  track: Track;
  lyrics?: string;
  lyricsIsLoading?: boolean;
  isPlaying: boolean;
  onClick: (track: Track) => void;
}

const fourColumns = 3; // grid has 12 columns, this prop describes the number of columns each grid item takes

export const TrackCard: FC<TrackCardProps> = ({
  track,
  lyrics,
  lyricsIsLoading,
  isPlaying,
  onClick
}) => {
  const { isPremium } = useAuthContext();
  const frontRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cardContentHeight, setCardContentHeight] = useState(0);
  const image = getSampleImage(track.images);

  const Front = useMemo(() => {
    return (
      <div ref={frontRef}>
        <ImageContainer>
          <CardMedia component="img" image={image.url} alt={track.name} />
          {isPremium && (
            <PlayIconContainer>
              <motion.div
                animate={!isHovered ? "start" : "end"}
                variants={{
                  start: { opacity: 0 },
                  end: {
                    opacity: 0.8,
                    transition: {
                      delay: 0.1
                    }
                  }
                }}
              >
                <PlayIcon fontSize="inherit" />
              </motion.div>
            </PlayIconContainer>
          )}
        </ImageContainer>
        <Typography variant="subtitle1" color="text.primary">
          {track.name}
        </Typography>
        {!isEmpty(track.artists) && (
          <Typography variant="subtitle2" color="text.secondary">
            {(track.artists ?? []).map((a) => a.name).join(", ")}
          </Typography>
        )}
      </div>
    );
  }, [image, track, isHovered, isPremium]);

  const Back = useMemo(() => {
    const sections = (lyrics ?? "").split("\n\n");

    return (
      <div
        className={css`
          height: ${cardContentHeight}px;
          transform: rotateY(180deg);
        `}
      >
        {lyricsIsLoading ? (
          <Loader />
        ) : (
          <Scrollable>
            {sections.map((s, si) => {
              const phrases = s.split("\n").map((p, pi) => (
                <Typography
                  key={pi}
                  paragraph
                  variant="body2"
                  color="text.secondary"
                  marginBottom={0}
                >
                  {p}
                </Typography>
              ));
              return <Section key={si}>{phrases}</Section>;
            })}
          </Scrollable>
        )}
      </div>
    );
  }, [lyrics, cardContentHeight, lyricsIsLoading]);

  useEffect(() => {
    if (Front && frontRef.current)
      setCardContentHeight(frontRef.current.clientHeight);
  }, [Front]);

  return (
    <Grid xs={fourColumns}>
      <motion.div
        animate={!isPlaying ? "front" : "back"}
        variants={{
          front: { rotateY: 0 },
          back: {
            rotateY: 180,
            transition: {
              duration: 2
            }
          }
        }}
      >
        <Card
          raised={isHovered}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => onClick(track)}
        >
          <CardContent>{!isPlaying ? Front : Back}</CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};

function getSampleImage(images: Image[], minImageDimension = 100) {
  let image = sample(images)!;
  // if the random image is too small, then try to find an acceptable one
  if (image.width < minImageDimension || image.height < minImageDimension) {
    const filtered = images.filter(
      (i) => i.width > minImageDimension && i.height > minImageDimension
    );
    if (!isEmpty(filtered)) image = sample(filtered)!;
  }
  return image;
}

const Card = styled(MuiCard)`
  cursor: pointer;
`;

const CardContent = styled(MuiCardContent)``;

const ImageContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PlayIconContainer = styled(Box)`
  position: absolute;
  top: calc(50% - 40px);
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 80px;
  z-index: 1;
`;

const PlayIcon = styled(MuiPlayIcon)`
  fill: white;
`;

const Scrollable = styled(Box)`
  height: 100%;
  overflow-y: auto;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;
