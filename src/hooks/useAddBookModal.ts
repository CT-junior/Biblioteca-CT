import { store } from "../store/addBookModal";

export const useAddBookModal = () => store.useState((s) => s);
