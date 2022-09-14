import { store } from "../store/books";

export const useBooks = () => store.useState((s) => s);
