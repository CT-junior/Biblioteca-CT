import { BookProps, BooksUserProps } from "../interfaces/Book";
import { regex } from "./constants";

function sortLastDateFirst(a, b) {
    if (a.date > b.date) {
        return -1;
    }
    if (a.date < b.date) {
        return 1;
    }

    return 0;
}

function generateRandomNumber(n: number): number {
    return Math.floor(Math.random() * n);
}

function formatStringToId(string: string, divider: string): string {
    return string
        .replace(/\s+/g, `${divider}`)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase();
}

function generateId(string: string, divider: string, n: number): string {
    return `${formatStringToId(string, divider)}.${String(
        generateRandomNumber(n)
    )}`;
}

function normalizeString(string: string): string {
    return string
        .toLowerCase()
        .replace(regex, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function filterListBookBySearchIndex(
    list: BookProps[],
    index: string
): BookProps[] {
    const listAux: BookProps[] = [];

    list.forEach((item) => {
        if (normalizeString(item.name).includes(normalizeString(index))) {
            listAux.push(item);
        }
    });

    return listAux;
}

function filterListBookUserBySearchIndex(
    list: BooksUserProps[],
    index: string
): BooksUserProps[] {
    const listAux: BooksUserProps[] = [];

    list.forEach((item) => {
        if (
            normalizeString(item.description.name).includes(
                normalizeString(index)
            )
        ) {
            listAux.push(item);
        }
    });

    return listAux;
}
export {
    sortLastDateFirst,
    generateId,
    formatStringToId,
    generateRandomNumber,
    filterListBookBySearchIndex,
    filterListBookUserBySearchIndex,
};
