import { useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { routes, useErrorSnackBar, useRouter } from "@/shared";
import { useAuthContext } from "./AuthProvider";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiry: number;
  isPremium: boolean;
}

export const useAuth = (code: string) => {
  const createSnackBarError = useErrorSnackBar();
  const { push } = useRouter();
  const {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    tokenExpiry,
    setTokenExpiry,
    setIsPremium
  } = useAuthContext();

  useEffect(() => {
    async function getAccessToken(code: string) {
      try {
        const response: AxiosResponse<LoginResponse> = await axios.post(
          `${process.env.NEXT_PUBLIC_WEBSERVER_BASE_URL}/login`,
          { code }
        );
        console.log(response.data);
        push(routes.index);
        setAccessToken(response.data.accessToken);
        setRefreshToken(response.data.refreshToken);
        setTokenExpiry(response.data.expiry);
        setIsPremium(response.data.isPremium);
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
    setTokenExpiry,
    setIsPremium
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
      }, Math.max(tokenExpiry - 6000, 600000));
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
