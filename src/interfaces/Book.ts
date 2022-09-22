export interface BookProps {
    id: string;
    name: string;
    author: string;
    volume: string;
    category: string;
    createdAt: string;
    imageUrl: string;
    status: string;
    borrowedTo?: string;
}
