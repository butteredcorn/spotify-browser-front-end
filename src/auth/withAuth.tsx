import { FC, PropsWithChildren, useEffect } from "react";
import { usePush } from "@/shared/utils";
import { useAuthContext } from "./AuthProvider";

const withAuth = (Component: FC) => {
  const Authenticated: FC = (): JSX.Element | null => {
    const push = usePush();
    const { accessToken } = useAuthContext();

    useEffect(() => {
      if (!accessToken) push("/Login");
    }, [accessToken, push]);

    return accessToken ? <Component /> : null;
  };

  return Authenticated;
};

export default withAuth;
