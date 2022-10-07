/* eslint-disable no-param-reassign */
import { store } from ".";

export const toggleSidebar = (state?: boolean) => {
  store.update((s) => {
    if (state !== undefined) {
      if (s.isFixed) {
        s.isOpen = true;
      } else {
        s.isOpen = state;
      }
    } else if (s.isFixed) {
      s.isOpen = true;
    } else {
      s.isOpen = !s.isOpen;
    }
  });
};

export const toggleFixedSidebar = () => {
  store.update((s) => {
    s.isFixed = !s.isFixed;
    s.isOpen = s.isFixed;
  });
};
