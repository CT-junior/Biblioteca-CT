import { store } from "../store/sidebar";

export const useSidebar = () => store.useState((s) => s);
