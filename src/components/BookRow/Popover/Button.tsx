import { IoMdReturnRight } from "react-icons/io";
import { MdEdit } from "react-icons/md";

import {
  Button as ButtonChakra,
  ButtonProps as ButtonChakraProps,
  HStack,
  Icon,
  Text,
} from "@chakra-ui/react";

interface ButtonProps extends ButtonChakraProps {
  variant: "re-alugar" | "devolver";
  disabled?: boolean;
  isLoading?: boolean;
}
export function Button({
  variant,
  disabled = false,
  isLoading = false,
  ...rest
}: ButtonProps) {
  return variant === "re-alugar" ? (
    <ButtonChakra
      size="md"
      w="100%"
      fontWeight="normal"
      borderRadius="full"
      borderColor="green.500"
      borderWidth="1px"
      bg="white"
      color="green.500"
      _hover={{
        bg: "green.50",
      }}
      disabled={disabled}
      isLoading={isLoading}
      {...rest}
    >
      <HStack>
        <Icon as={MdEdit} />
        <Text>Re-alugar</Text>
      </HStack>
    </ButtonChakra>
  ) : variant === "devolver" ? (
    <ButtonChakra
      colorScheme="green"
      size="md"
      w="100%"
      fontWeight="normal"
      borderRadius="full"
      disabled={disabled}
      isLoading={isLoading}
      {...rest}
    >
      <HStack>
        <Icon as={IoMdReturnRight} />
        <Text>Devolver</Text>
      </HStack>
    </ButtonChakra>
  ) : (
    <></>
  );
}
