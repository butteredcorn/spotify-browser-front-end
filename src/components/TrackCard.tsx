import React, { FC, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { isEmpty, sample } from "lodash";
import {
  Box,
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardMedia,
  Typography
} from "@mui/material";
import MuiPlayIcon from "@mui/icons-material/PlayCircleOutline";
import { Track, Image } from "@/models";
import styled from "@emotion/styled";

interface TrackCardProps {
  track: Track;
  onClick: (track: Track) => void;
}

const fourColumns = 3; // grid has 12 columns, this prop describes the number of columns each grid item takes

export const TrackCard: FC<TrackCardProps> = ({ track, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const image = getSampleImage(track.images);
  return (
    <Grid xs={fourColumns}>
      <Card
        raised={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick(track)}
      >
        <CardContent>
          <ImageContainer>
            <CardMedia component="img" image={image.url} alt={track.name} />
            {isHovered && (
              <PlayIconContainer>
                <PlayIcon fontSize="inherit" />
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
        </CardContent>
      </Card>
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

const Card = styled(MuiCard)``;

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
  opacity: 80%;
`;
