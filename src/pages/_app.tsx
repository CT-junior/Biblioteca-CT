import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from "@chakra-ui/react";
import { SidebarDrawerFixedProvider } from "../context/SidebarDrawerFixedContext";
import { SidebarDrawerTempProvider } from "../context/SidebarDrawerTempContext";

import { theme } from "../styles/theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerFixedProvider>
          <SidebarDrawerTempProvider>
            <Component {...pageProps} />
          </SidebarDrawerTempProvider>
        </SidebarDrawerFixedProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
