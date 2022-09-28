/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useCallback, useEffect } from "react";

import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { BodyContent } from "../components/BodyContent";
import { theme } from "../styles/theme";

export const { ToastContainer, toast } = createStandaloneToast();

export default function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <ChakraProvider theme={theme}>
                <BodyContent>
                    <Component {...pageProps} />
                </BodyContent>
            </ChakraProvider>
        </SessionProvider>
    );
}
