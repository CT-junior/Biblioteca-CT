/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-indent-props */

import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

import { ArrowUpIcon } from "@chakra-ui/icons";
import { Button, transition } from "@chakra-ui/react";

const ScrollButton = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    window.addEventListener("scroll", toggleVisible);

    return (
        <Button
            title="Voltar ao topo"
            style={{
                display: visible ? "flex" : "none",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                width: "50px",
                left: "95%",
                bottom: "40px",
                fontSize: "2rem",
                zIndex: "1",
                cursor: "pointer",
                // transition: "5s",
                // padding: "10",
                backgroundColor: "#FE6A01",
            }}
        >
            <ArrowUpIcon onClick={scrollToTop} />
        </Button>
    );
};

export default ScrollButton;
