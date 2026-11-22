import { createStore } from "vuex";

const POSTS_URL = `${import.meta.env.BASE_URL}data/posts.json`;

// store
export default createStore({
  state: () => ({
    posts: [],
    // idle | loading | loaded | error
    status: "idle",
    error: "",
    // authentication state (not persisted on purpose)
    isLoggedIn: false,
    user: null,
  }),

  // slice
  getters: {
    posts: (state) => state.posts,

    postById: (state) => (id) =>
      state.posts.find((post) => post.id === id) ?? null,

    likesOf: (state) => (id) =>
      state.posts.find((post) => post.id === id)?.likes ?? 0,

    isLoggedIn: (state) => state.isLoggedIn,

    currentUser: (state) => state.user,

    totalLikes: (state) =>
      state.posts.reduce((sum, post) => sum + post.likes, 0),
  },

  // slice
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },

    setStatus(state, status) {
      state.status = status;
    },

    setError(state, message) {
      state.error = message;
    },

    incrementLikes(state, id) {
      const post = state.posts.find((item) => item.id === id);

      if (post) {
        post.likes += 1;
      }
    },

    setUser(state, user) {
      state.user = user;
      state.isLoggedIn = user !== null;
    },

    resetLikes(state) {
      state.posts.forEach((post) => {
        post.likes = 0;
      });
    },
  },

  // slice
  actions: {
    async fetchPosts({ commit, state }) {
      if (state.status === "loading" || state.status === "loaded") {
        return;
      }

      commit("setStatus", "loading");

      try {
        const response = await fetch(POSTS_URL);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        commit("setPosts", await response.json());
        commit("setStatus", "loaded");
      } catch (error) {
        commit("setError", `Could not load posts: ${error}`);
        commit("setStatus", "error");
      }
    },

    likePost({ commit }, postId) {
      commit("incrementLikes", postId);
    },

    resetAllLikes({ commit }) {
      commit("resetLikes");
    },

    login({ commit }, email) {
      const name = email.split("@")[0];

      commit("setUser", { name, email });
    },

    logout({ commit }) {
      commit("setUser", null);
    },
  },
});
