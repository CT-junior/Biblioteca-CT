/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import React, { FC } from "react";

import { Box, useBreakpointValue } from "@chakra-ui/react";

import { useSidebar } from "../../hooks/useSidebar";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import styles from "./Body.module.css";

interface Props {
    children: any;
}

export const BodyContent: FC<Props> = ({ children }) => {
    const isOpenSidebar = useSidebar().isOpen;
    const isWideVersion = useBreakpointValue({
        base: false,
        sm: true,
    });

    const isSideBarDrawer = useBreakpointValue({
        base: true,
        md: false,
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.container}>
                <Sidebar />
                <Box
                    w="100%"
                    px="8"
                    py="8"
                    ml={isSideBarDrawer ? "0" : isOpenSidebar ? "64" : "20"}
                    transition="0.2s"
                >
                    <div className={styles.content}>{children}</div>
                </Box>
            </div>
        </div>
    );
};
