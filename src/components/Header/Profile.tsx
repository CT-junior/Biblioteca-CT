import { Flex, Box, Text, Avatar } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

import { RiUser3Fill } from "react-icons/ri";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {

const { data: session } = useSession();
console.log(session)
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="3" textAlign="right">
          <Text color="gray.900" fontSize="sm">{session?.user?.name}</Text>
        </Box>
      )}
      <Avatar
        size="md"
        name={`${session?.user?.name}`}
        bg="gray.100"
        icon={<RiUser3Fill fontSize='1.5rem' />}
        color="gray.700"
        src={`${session?.user?.image}`}
      />
    </Flex>
  );
}