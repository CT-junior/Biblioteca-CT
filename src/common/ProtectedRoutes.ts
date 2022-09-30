/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useBooks } from "../hooks/useBooks";
import { useRegistries } from "../hooks/useRegistries";
import {
    requestBooksFirebase,
    requestBooksUserFirebase,
} from "../store/books/actions";
import { requestRegistriesFirebase } from "../store/registries/actions";

const isBrowser = () => typeof window !== "undefined";

export const ProtectedRoutes = ({ router, children }) => {
    const { status, data: session } = useSession();
    const { books, booksUser } = useBooks();
    const { registries } = useRegistries();
    const route = useRouter();

    useEffect(() => {
        if (
            isBrowser() &&
            status === "unauthenticated" &&
            route.asPath !== "/auth/signin"
        ) {
            router.push("/auth/signin");
        } else {
            if (books.length === 0) requestBooksFirebase();
            if (booksUser.length === 0)
                requestBooksUserFirebase(session?.user?.id);
            if (registries.length === 0) requestRegistriesFirebase();
        }
    }, [
        books.length,
        booksUser.length,
        registries.length,
        route.asPath,
        router,
        session?.user?.id,
        status,
    ]);

    return children;
};
