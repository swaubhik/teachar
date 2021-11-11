import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lessonPostsCards: [
      { lesssonTitle: "lesson Card no.1", lessonCoverPhoto: "stock-1", lessonDate: "guu" },
      { lesssonTitle: "lesson Card no.2", lessonCoverPhoto: "stock-2", lessonDate: "guu" },
      { lesssonTitle: "lesson Card no.3", lessonCoverPhoto: "stock-3", lessonDate: "guu" },
      { lesssonTitle: "lesson Card no.4", lessonCoverPhoto: "stock-4", lessonDate: "guu" },
    ],
    editPost: null,
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
  },
  actions: {},
  modules: {},
});
