import React, {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState
} from "react";

export interface AuthProviderProps extends PropsWithChildren {}

export interface AuthContextProps {
  accessToken: string;
  setAccessToken: Dispatch<SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: Dispatch<SetStateAction<string>>;
  tokenExpiry: number;
  setTokenExpiry: Dispatch<SetStateAction<number>>;
}

const AuthContext = createContext<AuthContextProps>(null!);

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [tokenExpiry, setTokenExpiry] = useState(0);

  const value = useMemo(
    () => ({
      accessToken,
      setAccessToken,
      refreshToken,
      setRefreshToken,
      tokenExpiry,
      setTokenExpiry
    }),
    [accessToken, refreshToken, tokenExpiry]
  );

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export function useAuthContext(throwOnErr = false) {
  const context = useContext(AuthContext);
  if (throwOnErr && context == null) throw new Error();
  return context;
}
