/* eslint-disable import/no-anonymous-default-export */
import { Store } from "pullstate";

import { UserProps } from "../../interfaces/User";

interface IUserState {
  user: UserProps;
  isLoading: boolean;
}

const defaultUserState: IUserState = {
  user: { id: "", email: "", image: "", name: "", books: 0 },
  isLoading: false,
};

export const store = new Store<IUserState>(defaultUserState);

export default { store, key: "@user" };
