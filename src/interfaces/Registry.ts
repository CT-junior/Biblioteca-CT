import { BookProps } from "./Book";
import { UserProps } from "./User";

export interface RegistryProps {
  id: string;
  date: string;
  user: UserProps;
  action: string;
  book: BookProps;
}
