import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, {
  useRef,
  createContext,
  useMemo,
  useContext,
  FC,
  PropsWithChildren
} from "react";

export interface QueryCacheProviderProps extends PropsWithChildren {}

export interface QueryCacheContextProps {
  queryCache: QueryCache;
  queryClient: QueryClient;
}

const QueryCacheContext = createContext<QueryCacheContextProps>(null!);

export const QueryCacheProvider: FC<QueryCacheProviderProps> = (props) => {
  const queryClientRef = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 86400000
        }
      }
    })
  );

  const queryCacheRef = useRef(
    new QueryCache({
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
      }
    })
  );

  const value = useMemo(
    () => ({
      queryCache: queryCacheRef.current,
      queryClient: queryClientRef.current
    }),
    []
  );

  return (
    <QueryCacheContext.Provider value={value} {...props}>
      <QueryClientProvider client={queryClientRef.current}>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
        {props.children}
      </QueryClientProvider>
    </QueryCacheContext.Provider>
  );
};

export function useQueryCacheContext(throwOnErr = false) {
  const context = useContext(QueryCacheContext);
  if (throwOnErr && context == null) throw new Error();
  return context;
}
