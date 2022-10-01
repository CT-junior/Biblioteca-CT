/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import { RiUser3Fill } from "react-icons/ri";

import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

import { useUser } from "../../hooks/useUser";

interface ProfileProps {
    showProfileData?: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
    const { user } = useUser();

    return (
        <Flex align="center" display={["none", "flex"]}>
            {showProfileData && (
                <Box mr="3" textAlign="right">
                    <Text color="gray.900" fontSize="sm">
                        {user.name}
                    </Text>
                </Box>
            )}
            <Avatar
                size="md"
                name={`${user.name}`}
                bg="gray.100"
                icon={<RiUser3Fill fontSize="1.5rem" />}
                color="gray.700"
                src={`${user.image}`}
            />
        </Flex>
    );
}
