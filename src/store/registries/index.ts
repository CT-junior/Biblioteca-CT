/* eslint-disable import/no-anonymous-default-export */
import { Store } from "pullstate";

import { RegistryProps } from "../../interfaces/Registry";

interface IRegistryListState {
    registry: RegistryProps[];
    isLoading: boolean;
}

const defaultBookList: IRegistryListState = {
    registry: [],
    isLoading: false,
};

export const store = new Store<IRegistryListState>(defaultBookList);

export default { store, key: "@registries" };
