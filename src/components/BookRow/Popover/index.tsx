import {
  HStack,
  Popover as PopoverChakra,
  PopoverArrow,
  PopoverContent,
} from "@chakra-ui/react";

import { useBooks } from "../../../hooks/useBooks";
import { useUser } from "../../../hooks/useUser";
import { BooksUserProps } from "../../../interfaces/Book";
import { reBorrowBook, returnBookUser } from "../../../store/books/actions";
import { Button } from "./Button";
import { PopoverTrigger } from "./PopoverTrigger";
import { Tag } from "./Tag";

interface UpdateStatePopoverProps {
  book: BooksUserProps;
}
export function Popover({ book }: UpdateStatePopoverProps) {
  const { user } = useUser();
  const { isLoading } = useBooks();
  const handleReBorrowedBook = async () => {
    await reBorrowBook(book, user);
  };

  const handleReturnBook = async () => {
    await returnBookUser(user, book);
  };

  return book.status === "devolvido" ? (
    <PopoverChakra placement="top">
      <Tag variant="devolvido" />
      <PopoverTrigger />
      <PopoverContent py="4" px="6" shadow="md" borderRadius="full">
        <HStack align="center">
          <Button
            variant="re-alugar"
            onClick={handleReBorrowedBook}
            isLoading={isLoading}
          />
          <Button
            variant="devolver"
            disabled
            onClick={handleReturnBook}
            isLoading={isLoading}
          />
        </HStack>
        <PopoverArrow />
      </PopoverContent>
    </PopoverChakra>
  ) : book.endDate < new Date(Date.now()).toISOString() ? (
    <PopoverChakra placement="top">
      <Tag variant="em-atraso" />
      <PopoverTrigger />
      <PopoverContent py="4" px="6" shadow="md" borderRadius="full">
        <HStack align="center">
          <Button
            variant="re-alugar"
            onClick={handleReBorrowedBook}
            isLoading={isLoading}
            disabled
          />
          <Button
            variant="devolver"
            onClick={handleReturnBook}
            isLoading={isLoading}
          />
        </HStack>
        <PopoverArrow />
      </PopoverContent>
    </PopoverChakra>
  ) : (
    <PopoverChakra placement="top">
      <Tag variant="pendente" />
      <PopoverTrigger />
      <PopoverContent py="4" px="6" shadow="md" borderRadius="full">
        <HStack align="center">
          <Button
            variant="re-alugar"
            onClick={handleReBorrowedBook}
            isLoading={isLoading}
            disabled
          />
          <Button
            variant="devolver"
            onClick={handleReturnBook}
            isLoading={isLoading}
          />
        </HStack>
        <PopoverArrow />
      </PopoverContent>
    </PopoverChakra>
  );
}
