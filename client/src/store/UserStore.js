import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userStore = (set, get) => ({
  user: [],

  addUser: (data) => {
    //set all users to blank
    set(() => ({ user: [] }));
    //update
    set((state) => ({
      user: [...state.user, data],
    }));
  },
});

const useUserStore = create(devtools(persist(userStore, { name: "user" })));
export default useUserStore;
