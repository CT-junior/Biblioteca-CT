import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useBooks } from "../hooks/useBooks";
import { requestBooksUserFirebase } from "../store/books/actions";
import { requestUserFirebase } from "../store/user/actions";

const isBrowser = () => typeof window !== "undefined";

export const ProtectedRoutes = ({ router, children }) => {
  const { status, data: session } = useSession();
  const { booksUser } = useBooks();

  const route = useRouter();

  useEffect(() => {
    if (
      isBrowser() &&
      status === "unauthenticated" &&
      route.asPath !== "/auth/signin"
    ) {
      router.push("/auth/signin");
    } else {
      if (booksUser.length === 0) requestBooksUserFirebase(session?.user?.id);
      if (session) requestUserFirebase(session?.user?.id);
    }
  }, [booksUser.length, route.asPath, router, session, status]);

  return children;
};
