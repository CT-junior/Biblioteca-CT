import { BookProps } from "./Book";

export interface UserProps {
    id: string;
    email: string;
    name: string;
    image: string;
    borrowedBooks: BookProps[] | null;
}
