/* eslint-disable import/no-anonymous-default-export */
import { Store } from "pullstate";

import { IBookState } from "../../interfaces/Book";

interface IBookListState {
    books: IBookState[];
    isLoading: boolean;
}

const defaultBookList: IBookListState = {
    books: [],
    isLoading: false,
};

export const store = new Store<IBookListState>(defaultBookList);

export default { store, key: "@books" };
