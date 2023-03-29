import { Image } from "./image";
import { Album } from "./album";
import { Artist } from "./artist";

export interface Track {
  id: string;
  name: string;
  href: string;
  uri: string;
  type: string;
  genres: string[];
  popularity: number;
  images: Image[]; // backend will only send tracks with images
  album?: Album;
  artists?: Artist[];
}
