import {
  Tr,
  Td,
  HStack,
  Text,
  useBreakpointValue,
  VStack,
  Flex,
  Divider,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";

import { BooksUserProps } from "../../interfaces/Book";
import { Content } from "./Content";
import { Popover } from "./Popover";

interface Props {
  book: BooksUserProps;
}

export function BookRow({ book }: Props) {
  const isMobileView = useBreakpointValue({
    base: true,
    md: false,
  });

  const height = 150;
  const width = height * 0.675;

  if (!isMobileView) {
    return (
      <Tr shadow="md" borderRadius="xl">
        <Td>
          <Content>
            <HStack spacing="4">
              {book.description.imageUrl && (
                <Image
                  src={book.description.imageUrl}
                  alt={book.description.name}
                  width="47,25px"
                  height="70px"
                  objectFit="cover"
                  priority
                />
              )}
              <Text fontSize="sm">{book.description.name}</Text>
            </HStack>
          </Content>
        </Td>
        <Td>
          <Content justify="center">
            {new Date(book.startDate).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Content>
        </Td>
        <Td>
          <Content justify="center">
            {new Date(book.endDate).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Content>
        </Td>

        <Td>
          <Content justify="flex-end">
            <Popover book={book} />
          </Content>
        </Td>
      </Tr>
    );
  }

  if (isMobileView) {
    return (
      <Flex flexDir="column" rowGap="2" alignItems="center">
        <VStack spacing="4" m="0">
          {book.description.imageUrl && (
            <Image
              src={book.description.imageUrl}
              alt={book.description.name}
              width={width}
              height={height}
              objectFit="cover"
              priority
            />
          )}
          <Text fontSize="sm" fontWeight="medium">
            {book.description.name}
          </Text>
        </VStack>
        <HStack paddingTop="5">
          <Box pr="5">
            <Text fontSize="small" fontWeight="light" textAlign="start">
              Empréstimo
            </Text>
            <Content justify="center" h="max-content">
              {new Date(book.startDate).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Content>
          </Box>
          <Divider
            h="40px"
            border="solid 2px"
            borderRadius="lg"
            borderColor="var(--chakra-colors-chakra-border-color)"
          />
          <Box pl="5">
            <Text fontSize="small" fontWeight="light" textAlign="end">
              Devolução
            </Text>
            <Content justify="center" h="max-content">
              {new Date(book.endDate).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </Content>
          </Box>
        </HStack>

        <Content justify="center" h="max-content" paddingTop="3">
          <Popover book={book} />
        </Content>
      </Flex>
    );
  }
}
