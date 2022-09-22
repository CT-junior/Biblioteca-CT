import { number } from "yup";

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

export {
    sortLastDateFirst,
    generateId,
    formatStringToId,
    generateRandomNumber,
};
