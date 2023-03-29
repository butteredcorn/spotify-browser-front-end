import { Image } from "./image";

export interface Album {
  id: string;
  name: string;
  href: string;
  uri: string;
  type: string;
  is_playable: boolean;
  total_tracks: number;
  release_date: string; // YYYY-MM-DD
  images?: Image[];
}
