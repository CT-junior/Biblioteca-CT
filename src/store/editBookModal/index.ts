/* eslint-disable import/no-anonymous-default-export */
import { Store } from "pullstate";

import { IBookState } from "../../interfaces/Book";

interface IEditBookModalState {
    isOpenEditBookModal: boolean;
    selectedBook: IBookState;
}

const defaultEditBookModal: IEditBookModalState = {
    isOpenEditBookModal: false,
    selectedBook: {
        id: "",
        author: "",
        category: "",
        createdAt: "",
        imageUrl: "",
        name: "",
        volume: "",
    },
};

export const store = new Store<IEditBookModalState>(defaultEditBookModal);

export default { store, key: "@newbookmodal" };
