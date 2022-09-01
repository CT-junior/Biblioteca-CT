import { Box, Button, Center, Divider, Flex, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react"

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const SignIn: NextPage = ({ providers }) => {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Box bgColor="#F6F6F6" w="1120px" h="300" borderRadius={40} shadow="lg">
        <Stack direction="row" justify="center" align="center" h="100%">
          <Box w="45%" pl="80px">
            <Image
              src="/images/ct-black-horizontal-logo.svg"
              alt="CT Junior's company logo"
              width="400px"
              height="85px"
            />
          </Box>
          <Center height="120px">
            <Divider orientation="vertical" borderColor="blackAlpha.300" />
          </Center>
          <Box
            w="45%"
            display="flex"
            alignItems="center"
            justifyContent="end"
            pr="120px"
          >
            <Button
              onClick={() => signIn(providers['google'].id)}
              size="lg"
              leftIcon={<FcGoogle size={24} />}
              bg="white"
              shadow="md"
              color="blackAlpha.700"
              fontSize="20px"
              h="60px"
              _hover={{
                bgColor: "blackAlpha.50",
              }}              
            >
              Logar com a conta da CT
            </Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default SignIn;

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
