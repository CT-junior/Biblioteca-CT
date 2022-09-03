/* eslint-disable import/no-anonymous-default-export */
import { Store } from 'pullstate';

interface ISidebarState {
    isFixed: boolean;
    isOpen: boolean;
}

const defaultSidebarState: ISidebarState = {
    isFixed: false,
    isOpen: false,
}

export const store = new Store<ISidebarState>(defaultSidebarState);

export default { store, key: '@sidebar'}