import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";

import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Stack,
  Text,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

import LogoCt from "../../assets/images/ct-black-horizontal-logo.svg";
import { fireErrorToast } from "../../common/utils";

interface Props {
  error?: string | string[];
}

const SignIn: NextPage<Props> = ({ error }) => {
  const toast = useToast();

  useEffect(() => {
    if (error) {
      const toastOptions: UseToastOptions = {};

      if (error === "AccessDenied") {
        toastOptions.description = (
          <Text>
            O email não é do domínio da
            <Text as="strong">CT Junior</Text>
          </Text>
        );
      } else {
        toastOptions.title = error;
        toastOptions.description =
          "Um erro inesperado ocorreu. Tente novamente.";
      }

      fireErrorToast(toast, toastOptions);
    }
  }, [error, toast]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Flex w="100vw" h="100vh" align="center" justify="center">
        <Box
          bgColor="blackAlpha.50"
          w="100%"
          maxW="1120px"
          h="300"
          borderRadius={40}
          shadow="lg"
          m={8}
          p={8}
        >
          <Stack
            direction={["column", "column", "row"]}
            justify="center"
            align="center"
            h="100%"
            gap={12}
          >
            <Flex w="100%" align="center" justify="center">
              <Image
                priority
                src={LogoCt}
                alt="CT Junior's company logo"
                width="400px"
                height="85px"
              />
            </Flex>
            <Center height="120px" display={["none", "none", "unset"]}>
              <Divider orientation="vertical" borderColor="blackAlpha.300" />
            </Center>
            <Flex w="100%" align="center" justify="center">
              <Button
                onClick={() => signIn("google", { callbackUrl: "/" })}
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
    </>
  );
};

SignIn.getInitialProps = async ({ query }) => {
  const { error } = query;

  return { error };
};

export default SignIn;
