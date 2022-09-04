import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

import { RiUser3Fill } from "react-icons/ri";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="3" textAlign="right">
          <Text color="gray.900" fontSize="sm">Guilerme Silva Teixeira</Text>
        </Box>
      )}
      <Avatar
        size="md"
        // name="Guilerme Silva Teixeira"
        bg="gray.100"
        icon={<RiUser3Fill fontSize='1.5rem' />}
        color="gray.700"
        src=""
      />
    </Flex>
  );
}