/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { Divider, Flex, Heading } from "@chakra-ui/react";

interface TitleProps {
    title: string;
}

export function HeadTitle({ title }: TitleProps) {
    return (
        <Flex
            align="flex-start"
            aria-label="second-header"
            pb="6"
            gap="2"
            direction="column"
        >
            <Heading as="h1" fontSize="xl">
                {title}
            </Heading>
            <Divider marginBlock="5" />
        </Flex>
    );
}
