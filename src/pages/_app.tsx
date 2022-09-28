/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

import { ProtectedRoutes } from "../common/ProtectedRoutes";
import { BodyContent } from "../components/BodyContent";
import { theme } from "../styles/theme";

export const { ToastContainer, toast } = createStandaloneToast();

export default function MyApp({
    Component,
    pageProps: { session, ...pageProps },
    router,
}: AppProps) {
    return (
        <SessionProvider session={session}>
            <ProtectedRoutes router={router}>
                <ChakraProvider theme={theme}>
                    <BodyContent>
                        <Component {...pageProps} />
                    </BodyContent>
                </ChakraProvider>
            </ProtectedRoutes>
        </SessionProvider>
    );
}
