import { BooksUserProps } from "./Book";

export interface UserProps {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  books: number;
}
