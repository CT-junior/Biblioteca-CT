import {
  HStack,
  Icon,
  Text,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Button,
} from "@chakra-ui/react";

import { FiMoreVertical } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";

export function MoreSettingsPopover() {
  return (
    <Popover placement="bottom-start">
      <PopoverTrigger >
        <IconButton
          aria-label="Open popover"
          size="sm"
          icon={<FiMoreVertical />}
          variant="ghost"
          borderRadius="full"
        />
      </PopoverTrigger>
      <PopoverContent p={5} w="32">
        <Stack align="center">
          <Button variant="unstyled" size="sm" fontWeight="normal">
            <HStack>
              <Icon as={MdEdit} />
              <Text>Editar</Text>
            </HStack>
          </Button>
          <Button variant="unstyled" size="sm" fontWeight="normal">
            <HStack>
              <Icon as={IoMdTrash} />
              <Text>Excluir</Text>
            </HStack>
          </Button>
        </Stack>
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
}
