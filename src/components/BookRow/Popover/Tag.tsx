/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import {
  Tag as TagChakra,
  TagLabel,
  useBreakpointValue,
} from "@chakra-ui/react";

type TagType = {
  variant: "pendente" | "devolvido" | "em-atraso";
};
export function Tag({ variant }: TagType) {
  const isMobileView = useBreakpointValue({
    base: true,
    md: false,
  });

  return variant === "pendente" ? (
    <TagChakra
      size="lg"
      colorScheme="orange"
      py="2"
      ml={isMobileView ? "32px" : "0"}
    >
      <TagLabel ml="2">Pendente</TagLabel>
    </TagChakra>
  ) : variant === "devolvido" ? (
    <TagChakra
      size="lg"
      colorScheme="green"
      py="2"
      ml={isMobileView ? "32px" : "0"}
    >
      <TagLabel ml="2">Devolvido</TagLabel>
    </TagChakra>
  ) : variant === "em-atraso" ? (
    <TagChakra
      size="lg"
      colorScheme="red"
      py="2"
      ml={isMobileView ? "32px" : "0"}
    >
      <TagLabel ml="2">Em atraso</TagLabel>
    </TagChakra>
  ) : (
    <></>
  );
}
