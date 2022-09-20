/* eslint-disable react/jsx-indent */
import { cloneElement, ReactElement } from "react";

import { transition } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    shouldMatchExactHref?: boolean;
}

export function ActiveLink({
    children,
    shouldMatchExactHref = false,
    ...rest
}: ActiveLinkProps) {
    const { asPath } = useRouter();

    let isActive = false;

    if (asPath === rest.href || asPath === rest.as) {
        isActive = true;
    }

    return (
        <Link {...rest}>
            {cloneElement(children, {
                color: isActive ? "orange.ct" : "gray.600",
                transition: ".5s",
            })}
        </Link>
    );
}
