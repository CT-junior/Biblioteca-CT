import { store } from "../store/registries";

export const useRegistries = () => store.useState((s) => s);
