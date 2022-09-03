import type { NextPage } from "next";
import { Box, Flex, Icon, IconButton } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";

import { HiOutlineMenu } from "react-icons/hi";
import { useSidebar } from "../hooks/sidebar";
import { toggleFixedSidebar } from "../store/sidebar/actions";

const Home: NextPage = () => {
  const { isFixed } = useSidebar();

  return (
    <Flex direction="column" h="100vh">
      <Box
        w="100%"
        borderBottomColor="blackAlpha.200"
        borderBottomWidth="1px"
        borderBottomStyle="solid"
        h="16"
        bg="white"
      >
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={HiOutlineMenu}/>}
          fontSize="24"
          variant="unstyled"
          onClick={toggleFixedSidebar}
          mr="2"
          bg={isFixed ? "gray.300" : ""}
          >

        </IconButton>
      </Box>
      <Flex w="100%" mx="auto">
        <Sidebar />
      </Flex>
    </Flex>
  );
};

export default Home;
