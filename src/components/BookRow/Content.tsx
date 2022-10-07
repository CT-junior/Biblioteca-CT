import { ReactNode } from "react";

import { Flex, FlexProps } from "@chakra-ui/react";

interface ContentProps extends FlexProps {
  children: ReactNode;
}

export function Content({ children, ...rest }: ContentProps) {
  return (
    <Flex align="center" height="40" {...rest}>
      {children}
    </Flex>
  );
}
