import { store } from "../store/user";

export const useUser = () => store.useState((s) => s);
