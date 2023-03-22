import { FC, useEffect } from "react";
import { routes, useRouter } from "@/shared";
import { useAuthContext } from "./AuthProvider";

const withAuth = (Component: FC) => {
  const Authenticated: FC = (): JSX.Element | null => {
    const { push, getPath } = useRouter();
    const { accessToken } = useAuthContext();

    useEffect(() => {
      if (!accessToken && getPath() !== routes.login) push(routes.login);
    }, [accessToken, push, getPath]);

    return accessToken ? <Component /> : null;
  };

  return Authenticated;
};

export default withAuth;
