import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const LibraryManager : NextPage = () => {
    return(
        <Flex direction="column" h="100vh">
        <Header />
        <Flex w="100%" mx="auto">
          <Sidebar />
        </Flex>
      </Flex>
    )
}

export default LibraryManager;