import { Image } from "./image";

export interface Artist {
  id: string;
  name: string;
  href: string;
  uri: string;
  type: string;
  genres: string[];
  popularity: number;
  images?: Image[];
}
