import { store } from "../store/users";

export const useUsers = () => store.useState((s) => s);
