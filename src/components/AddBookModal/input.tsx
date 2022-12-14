/* eslint-disable react/jsx-indent-props */
import { FieldValues, UseFormRegister } from "react-hook-form";

import {
  FormLabel,
  Text,
  Input as InputChakra,
  InputProps as InputChakraProps,
  FormControl,
} from "@chakra-ui/react";

type InputProps = InputChakraProps & {
  id: string;
  error?: string;
  register: UseFormRegister<FieldValues>;
};

export const Input = ({
  id,
  placeholder,
  type,
  error,
  register,
  isDisabled,
}: InputProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor={id}>{placeholder}</FormLabel>
      <InputChakra
        id={id}
        placeholder={placeholder}
        type={type}
        {...register(id)}
        borderColor={error ? "red.500" : "gray.300"}
        isDisabled={isDisabled}
      />
      <Text fontSize="sm" color="red.500">
        {error}
      </Text>
    </FormControl>
  );
};
