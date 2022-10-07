/* eslint-disable import/no-anonymous-default-export */
import { Store } from "pullstate";

import { UserProps } from "../../interfaces/User";

interface IUsersListState {
  users: UserProps[];
  isLoading: boolean;
}

const defaultUsersList: IUsersListState = {
  users: [],
  isLoading: false,
};

export const store = new Store<IUsersListState>(defaultUsersList);

export default { store, key: "@users" };
