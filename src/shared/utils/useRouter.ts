import { useRouter as useNextRouter } from "next/router";
import type { NextRouter } from "next/router";
import { useCallback, useRef, useState } from "react";

export function useRouter(): {
  push: NextRouter["push"];
  getPath: () => string;
  getQuery: (query: string) => string | string[] | undefined;
} {
  const router = useNextRouter();
  const routerRef = useRef(router);

  routerRef.current = router;

  const [{ push }] = useState<Pick<NextRouter, "push">>({
    push: (path) => routerRef.current.push(path)
  });

  const getQuery = useCallback(
    (query: string) => routerRef.current.query[query],
    []
  );

  const getPath = useCallback(() => routerRef.current.pathname, []);

  return {
    push,
    getPath,
    getQuery
  };
}
