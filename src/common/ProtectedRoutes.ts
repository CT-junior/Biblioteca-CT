/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useBooks } from "../hooks/useBooks";
import { useRegistries } from "../hooks/useRegistries";
import { useUsers } from "../hooks/useUsers";
import {
    requestBooksFirebase,
    requestBooksUserFirebase,
} from "../store/books/actions";
import { requestRegistriesFirebase } from "../store/registries/actions";
import { requestUserFirebase } from "../store/user/actions";
import { requestUsersFirebase } from "../store/users/actions";

const isBrowser = () => typeof window !== "undefined";

export const ProtectedRoutes = ({ router, children }) => {
    const { status, data: session } = useSession();
    const { books, booksUser } = useBooks();
    const { registries } = useRegistries();
    const { users } = useUsers();
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
            if (session) requestUserFirebase(session?.user?.id);
            if (users.length === 0) requestUsersFirebase();
        }
    }, [
        books.length,
        booksUser.length,
        registries.length,
        route.asPath,
        router,
        session,
        session?.user?.id,
        status,
        users.length,
    ]);

    return children;
};
