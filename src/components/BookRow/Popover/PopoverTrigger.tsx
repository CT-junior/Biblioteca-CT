import { FiMoreVertical } from "react-icons/fi";

import {
  PopoverTrigger as PopoverTriggerChakra,
  IconButton,
} from "@chakra-ui/react";

export function PopoverTrigger() {
  return (
    <PopoverTriggerChakra>
      <IconButton
        aria-label="Open popover"
        size="sm"
        icon={<FiMoreVertical />}
        variant="ghost"
        borderRadius="full"
        _hover={{
          bg: "blackAlpha.50",
        }}
      />
    </PopoverTriggerChakra>
  );
}
