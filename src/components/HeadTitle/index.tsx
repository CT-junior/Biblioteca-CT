import { Divider, Flex, Heading } from "@chakra-ui/react";

interface TitleProps {
  title: string;
}

export function HeadTitle({ title }: TitleProps) {
  return (
    <Flex
      align="flex-start"
      justify="center"
      aria-label="second-header"
      direction="column"
    >
      <Heading as="h1" fontSize="xl" pb="6">
        {title}
      </Heading>
      <Divider />
    </Flex>
  );
}
