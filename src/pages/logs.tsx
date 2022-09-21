/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { useEffect } from "react";

import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";

import { HeadTitle } from "../components/HeadTitle";
import { useRegistries } from "../hooks/useRegistries";
import { RegistryProps } from "../interfaces/Registry";
import { requestRegistriesFirebase } from "../store/registries/actions";

const Logs: NextPage = () => {
    const { registry } = useRegistries();

    useEffect(() => {
        requestRegistriesFirebase();
    }, []);

    return (
        <>
            <HeadTitle title="Registros" />
            <Box
                backgroundColor="blackAlpha.50"
                padding="10"
                borderWidth="1px"
                borderRadius="lg"
                h="70vh"
                overflow="scroll"
                overflowX="hidden"
            >
                <Flex gap="4" align="flex-start" direction="column">
                    {registry.map((registry: RegistryProps) => {
                        return (
                            <Text
                                verticalAlign="center"
                                as="p"
                                gap="1"
                                key={registry.id}
                            >
                                {new Date(registry.date).toLocaleDateString(
                                    "pt-BR",
                                    {
                                        dateStyle: "short",
                                    }
                                )}
                                {" às "}
                                {new Date(registry.date).toLocaleTimeString(
                                    "pt-BR",
                                    {
                                        timeStyle: "short",
                                    }
                                )}{" "}
                                | O livro
                                <Text as="b"> {registry.book.name} ↗ </Text>
                                foi {registry.action} por
                                <Avatar
                                    src={`${registry.user.image}`}
                                    size="sm"
                                    ml="2"
                                    my="auto"
                                    verticalAlign="middle"
                                />
                                <Text as="b"> {registry.user.name}</Text>
                            </Text>
                        );
                    })}
                </Flex>
            </Box>
        </>
    );
};

export default Logs;
