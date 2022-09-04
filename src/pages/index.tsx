import type { NextPage } from "next";
import { Flex } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";

import { Header } from "../components/Header";
import { useSession} from "next-auth/react";
import { useEffect } from "react"
import { useRouter } from 'next/router'

const Home: NextPage = () => {

  const { status } = useSession()
  const router = useRouter();

  useEffect(()=>{
    if(status != "loading"){
      if (status == "unauthenticated") {
        router.push('/auth/signin')
      }
    }
  },[router,status])

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
