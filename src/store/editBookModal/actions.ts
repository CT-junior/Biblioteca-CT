/* eslint-disable no-unused-expressions */
/* eslint no-param-reassign: "error" */
import { store } from ".";
import { IBookState } from "../../interfaces/Book";

export const onOpenEditBookModal = (book: IBookState) => {
    setSelectedBook(book);
    store.update((s) => {
        s.isOpenEditBookModal = true;
    });
};

export const onCloseEditBookModal = () => {
    store.update((s) => {
        s.isOpenEditBookModal = false;
    });
};

const setSelectedBook = (book: IBookState) => {
    store.update((s) => {
        s.selectedBook.imageUrl = book.imageUrl;
        s.selectedBook.name = book.name;
        s.selectedBook.author = book.author;
        s.selectedBook.volume = book.volume;
        s.selectedBook.category = book.category;
        s.selectedBook.createdAt = book.createdAt;
    });
};
