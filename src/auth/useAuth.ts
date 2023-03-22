import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { routes, useErrorSnackBar, usePush } from "@/shared";
import { useAuthContext } from "./AuthProvider";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiry: number;
}

export const useAuth = (code: string) => {
  const createSnackBarError = useErrorSnackBar();
  const push = usePush();
  const {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    tokenExpiry,
    setTokenExpiry
  } = useAuthContext();

  useEffect(() => {
    async function getAccessToken(code: string) {
      try {
        const response: AxiosResponse<LoginResponse> = await axios.post(
          `${process.env.NEXT_PUBLIC_WEBSERVER_BASE_URL}${routes.login}`,
          { code }
        );
        push(routes.index);
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setTokenExpiry(response.data.expiry);
      } catch (error: any) {
        push(routes.login);
        createSnackBarError(error?.message);
      }
    }

    if (code) getAccessToken(code);
  }, [
    code,
    createSnackBarError,
    push,
    setAccessToken,
    setRefreshToken,
    setTokenExpiry
  ]);

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
        push(routes.login);
        createSnackBarError(error?.message);
      }
    }

    if (refreshToken && tokenExpiry) {
      const interval = setInterval(() => {
        getRefreshToken(refreshToken);
      }, tokenExpiry - 6000);
      return () => clearInterval(interval);
    }
  }, [
    refreshToken,
    tokenExpiry,
    createSnackBarError,
    push,
    setAccessToken,
    setRefreshToken,
    setTokenExpiry
  ]);

  return accessToken;
};
