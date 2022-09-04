import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";

import { Header } from "../components/Header";

const Home: NextPage = () => {

  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" mx="auto">
        <Sidebar />
      </Flex>
    </Flex>
  );
};

export default Home;
