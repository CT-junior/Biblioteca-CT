import { store } from "../store/editBookModal";

export const useEditBookModal = () => store.useState((s) => s);
