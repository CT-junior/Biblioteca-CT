/* eslint-disable import/no-anonymous-default-export */
import { Store } from "pullstate";

import { BookProps } from "../../interfaces/Book";

interface IBookListState {
    books: BookProps[];
    isLoading: boolean;
}

const defaultBookList: IBookListState = {
    books: [],
    isLoading: false,
};

export const store = new Store<IBookListState>(defaultBookList);

export default { store, key: "@books" };
