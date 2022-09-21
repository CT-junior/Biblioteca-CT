/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */

import { useEffect } from "react";

import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";

import { HeadTitle } from "../components/HeadTitle";
import { useRegistries } from "../hooks/useRegistries";
import { RegistryProps } from "../interfaces/Registry";
import { requestRegistriesFirebase } from "../store/registries/actions";

const Backlog: NextPage = () => {
    const { data: session } = useSession();
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
                                {registry.date} | O livro
                                <Text as="b"> {registry.book.name} </Text>
                                foi {registry.action} por
                                <Avatar
                                    src={`${registry.user.image}`}
                                    size="sm"
                                    ml="2"
                                    my="auto"
                                    verticalAlign="middle"
                                />
                                <Text as="b"> Héber Lima Silva </Text>
                            </Text>
                        );
                    })}
                </Flex>
            </Box>
        </>
    );
};

export default Backlog;
