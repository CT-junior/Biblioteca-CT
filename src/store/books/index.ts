/* eslint-disable import/no-anonymous-default-export */
import { Store } from "pullstate";

import { IBookState } from "../../interfaces/Book";

export const store = new Store<IBookState[]>([]);

export default { store, key: "@books" };
