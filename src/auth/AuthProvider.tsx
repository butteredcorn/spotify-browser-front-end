import { gqlRequestClient } from "@/graphql";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

export interface AuthProviderProps extends PropsWithChildren {}

export interface AuthContextProps {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string) => void;
  tokenExpiry: number | null;
  setTokenExpiry: (expiry: number) => void;
  isPremium: boolean;
  setIsPremium: (isPremium: boolean) => void;
  jwtToken: string | null;
  setJwtToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextProps>(null!);

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [jwtToken, setJwtToken] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
      tokenExpiry,
      setTokenExpiry,
      isPremium,
      setIsPremium,
      jwtToken,
      setJwtToken
    }),
    [
      accessToken,
      refreshToken,
      tokenExpiry,
      isPremium,
      setIsPremium,
      jwtToken,
      setJwtToken
    ]
  );

  useEffect(() => {
    if (gqlRequestClient && jwtToken) {
      gqlRequestClient.setHeader("authorization", `Bearer ${jwtToken}`);
    }
  }, [jwtToken]);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export function useAuthContext(throwOnErr = false) {
  const context = useContext(AuthContext);
  if (throwOnErr && context == null) throw new Error();
  return context;
}
