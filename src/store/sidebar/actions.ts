/* eslint-disable no-unused-expressions */
/* eslint no-param-reassign: "error" */
import { store } from ".";

export const toggleSidebar = (state?: boolean) => {
    store.update((s) => {
        if (state !== undefined) {
            s.isFixed ? (s.isOpen = true) : (s.isOpen = state);
        } else {
            s.isFixed ? (s.isOpen = true) : (s.isOpen = !s.isOpen);
        }
    });
};

export const toggleFixedSidebar = () => {
    store.update((s) => {
        s.isFixed = !s.isFixed;
        s.isOpen = s.isFixed;
    });
};
