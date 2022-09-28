import { UserProps } from "./User";

interface BookProps {
    id: string;
    name: string;
    author: string;
    volume: string;
    category: string;
    createdAt: string;
    imageUrl: string;
    status: string;
    borrowedTo: {
        user: UserProps;
        startDate: string;
        endDate: string;
    } | null;
}

interface BooksUserProps {
    description: BookProps;
    status: string;
    startDate: string;
    endDate: string;
}

export type { BookProps, BooksUserProps };
