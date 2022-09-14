/* eslint no-param-reassign: "error" */
import { store } from ".";

export const onOpenAddBookModal = () => {
    store.update((s) => {
        s.isOpenAddBookModal = true;
    });
};

export const onCloseAddBookModal = () => {
    store.update((s) => {
        s.isOpenAddBookModal = false;
    });
};
