import { AuthProvider } from "@/auth";
import { QueryCacheProvider } from "@/shared";
import { SnackBarProvider } from "@/shared/SnackBarProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SnackBarProvider>
        <QueryCacheProvider>
          <Component {...pageProps} />
        </QueryCacheProvider>
      </SnackBarProvider>
    </AuthProvider>
  );
}
