///store to store other user posts

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const otherPeoplePostsStore = (set, get) => ({
  posts: [],

  addOtherPeoplePost: (data) => {
    //set all posts to blank
    set(() => ({ posts: [] }));

    set((state) => ({
      posts: [...state.posts, data],
    }));
  },
});

const usePostStore = create(
  devtools(persist(otherPeoplePostsStore, { name: "article" })),
);
export default usePostStore;
