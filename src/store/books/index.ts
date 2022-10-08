/* eslint-disable import/no-anonymous-default-export */
import { Store } from "pullstate";

import { BookProps, BooksUserProps } from "../../interfaces/Book";

interface IBookListState {
  books: BookProps[];
  booksUser: BooksUserProps[];
  isLoading: boolean;
}

const defaultBookList: IBookListState = {
  books: [],
  booksUser: [],
  isLoading: false,
};

export const store = new Store<IBookListState>(defaultBookList);

export default { store, key: "@books" };
