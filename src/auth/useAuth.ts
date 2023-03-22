import { useCallback, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useErrorSnackBar } from "@/shared/SnackBarProvider";
import { usePush } from "@/shared/utils";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiry: number;
}

export const useAuth = (code: string) => {
  const createSnackBarError = useErrorSnackBar();
  const push = usePush();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [tokenExpiry, setTokenExpiry] = useState(0);

  useEffect(() => {
    async function getAccessToken(code: string) {
      try {
        const response: AxiosResponse<LoginResponse> = await axios.post(
          `${process.env.NEXT_PUBLIC_WEBSERVER_BASE_URL}/login`,
          { code }
        );
        push("/");
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setTokenExpiry(response.data.expiry);
      } catch (error: any) {
        push("/");
        createSnackBarError(error?.message);
      }
    }

    if (code) getAccessToken(code);
  }, [code, createSnackBarError, push]);

  // refresh spotify token as needed, access tokens last one hour for spotify
  useEffect(() => {
    async function getRefreshToken(refreshToken: string) {
      try {
        const response: AxiosResponse<LoginResponse> = await axios.post(
          `${process.env.NEXT_PUBLIC_WEBSERVER_BASE_URL}/refresh`,
          { refreshToken }
        );
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setTokenExpiry(response.data.expiry);
      } catch (error: any) {
        push("/");
        createSnackBarError(error?.message);
      }
    }

    if (refreshToken && tokenExpiry) {
      const interval = setInterval(() => {
        getRefreshToken(refreshToken);
      }, tokenExpiry - 6000);
      return () => clearInterval(interval);
    }
  }, [refreshToken, tokenExpiry, createSnackBarError, push]);

  return accessToken;
};
