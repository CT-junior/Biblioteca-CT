import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { SidebarDrawerProvider } from "../context/SidebarDrawerContext";

import { theme } from "../styles/theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
