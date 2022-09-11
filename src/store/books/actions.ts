/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
/* eslint no-param-reassign: "error" */
import { store } from ".";
import { IBookState } from "../../interfaces/Book";

export const addBook = (book: IBookState) => {
    store.update((s) => {
        s.push(book);
    });
};

export const removeBook = (id: String) => {
    store.update((s) => {
        s = s.filter((item) => item.id != id);
    });
};
