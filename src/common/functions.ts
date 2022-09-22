function sortLastDateFirst(a, b) {
    if (a.date > b.date) {
        return -1;
    }
    if (a.date < b.date) {
        return 1;
    }

    return 0;
}

export { sortLastDateFirst };
