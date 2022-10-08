import React, { useState } from "react";

import { ArrowUpIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

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
      display={visible ? "flex" : "none"}
      alignItems="center"
      justifyContent="center"
      position="fixed"
      width={50}
      left="95%"
      bottom="40px"
      fontSize="2rem"
      zIndex="1"
      cursor="pointer"
      backgroundColor="orange.500"
      _hover={{
        filter: "auto",
        brightness: "75%",
        transition: ".5s",
      }}
    >
      <ArrowUpIcon onClick={scrollToTop} />
    </Button>
  );
};

export default ScrollButton;
