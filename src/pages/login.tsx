import { Box, Button, Center, Divider, Flex, Stack} from "@chakra-ui/react";
import type { NextPage } from "next";

import Image from "next/image";

import LogoCt from "../assets/images/ct-black-horizontal-logo.svg"
import { FcGoogle } from "react-icons/fc";

const Login: NextPage = () => {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Box bgColor="blackAlpha.50" w="100%" maxW="1120px" h="300" borderRadius={40} shadow="lg" m={8} p={8}>
        <Stack direction={["column","column", "row"]} justify="center" align="center" h="100%" gap={12}>
          <Flex w="100%" align="center" justify="center">
            <Image
              priority
              src={LogoCt}
              width="400px"
              height="85px"
            />
          </Flex>
          <Center height="120px" display={["none", "none", "unset"]}>
            <Divider orientation={"vertical"}  borderColor="blackAlpha.300" />
          </Center>
          <Flex w="100%" align="center" justify="center">
            <Button
              pr={8}
              pl={8}
              h="60px"
              leftIcon={<FcGoogle size={24} />}
              bg="white"
              color="blackAlpha.700"
              shadow="md"
              _hover={{
                bgColor: "gray.50",
                
              }}              
            >
              Continuar com o google
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Flex>
  );
};

export default Login;
