import { UserProps } from "./User";

export interface BookProps {
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
