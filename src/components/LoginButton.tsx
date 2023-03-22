import React, { FC, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "@/auth/useAuth";
import { createQueryString } from "@/shared/utils";

const baseUrl = "https://accounts.spotify.com/authorize";

export const LoginButton: FC = () => {
  const router = useRouter();
  const [spotiyCode, setSpotifyCode] = useState("");
  useAuth(spotiyCode);

  const url = createQueryString(
    baseUrl,
    {
      client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      response_type: "code",
      redirect_uri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI,
      scope: [
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "user-library-modify",
        "user-read-playback-state",
        "user-modify-playback-state"
      ]
    },
    { arrayFormat: "bracket-separator", arrayFormatSeparator: " " }
  );

  useEffect(() => {
    const code = router.query["code"];
    if (code && typeof code !== "string") throw new Error("Unexpected code.");
    if (code) setSpotifyCode(code);
  }, [router]);

  return (
    <>
      <Button variant="contained" href={url}>
        Login
      </Button>
    </>
  );
};
