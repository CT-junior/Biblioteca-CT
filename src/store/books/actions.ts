/* eslint-disable array-callback-return */
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

export const editBook = (id: String, book: IBookState) => {
    store.update((s) => {
        s.map((s) => {
            if (s.id === id) {
                s.imageUrl = book.imageUrl;
                s.name = book.name;
                s.author = book.author;
                s.volume = book.volume;
                s.category = book.category;
                s.createdAt = book.createdAt;
            }
        });
    });
};
