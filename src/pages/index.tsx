import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import { Sidebar } from "../components/Sidebar";

const Home: NextPage = () => {
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

      </Box>
      <Flex w="100%" mx="auto">
        <Sidebar />
      </Flex>
    </Flex>
  );
};

export default Home;
