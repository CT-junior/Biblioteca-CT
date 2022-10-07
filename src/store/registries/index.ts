/* eslint-disable import/no-anonymous-default-export */
import { Store } from "pullstate";

import { RegistryProps } from "../../interfaces/Registry";

interface IRegistryListState {
	registries: RegistryProps[];
	isLoading: boolean;
}

const defaultBookList: IRegistryListState = {
	registries: [],
	isLoading: false,
};

export const store = new Store<IRegistryListState>(defaultBookList);

export default { store, key: "@registries" };
