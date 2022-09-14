/* eslint-disable import/no-anonymous-default-export */
import { Store } from "pullstate";

interface IAddBookModalState {
    isOpenAddBookModal: boolean;
}

const defaultAddBookModal: IAddBookModalState = {
    isOpenAddBookModal: false,
};

export const store = new Store<IAddBookModalState>(defaultAddBookModal);

export default { store, key: "@newbookmodal" };
