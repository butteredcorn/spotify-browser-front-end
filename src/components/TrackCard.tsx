import React, { FC, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { isEmpty, sample } from "lodash";
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardMedia,
  Typography
} from "@mui/material";
import { Track, Image } from "@/models";
import styled from "@emotion/styled";

interface TrackCardProps {
  track: Track;
}

const fourColumns = 3; // grid has 12 columns, this prop describes the number of columns each grid item takes

export const TrackCard: FC<TrackCardProps> = ({ track }) => {
  const [isHovered, setIsHovered] = useState(false);
  const image = getSampleImage(track.images);
  return (
    <Grid xs={fourColumns}>
      <Card
        raised={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent>
          <CardMedia component="img" image={image.url} alt={track.name} />
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
