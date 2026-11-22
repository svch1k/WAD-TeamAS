<script setup>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import PostCard from "../components/PostCard.vue";

const store = useStore();

const posts = computed(() => store.getters.posts);
const errorMessage = computed(() => store.state.error);
const isLoading = computed(
  () => store.state.status === "idle" || store.state.status === "loading",
);

onMounted(() => {
  store.dispatch("fetchPosts");
});

function resetLikes() {
  store.dispatch("resetAllLikes");
}
</script>

<template>
  <main class="home-layout">
    <div class="side-panel" aria-hidden="true"></div>

    <section class="feed" aria-label="Recent posts">
      <h1>Recent posts</h1>

      <div v-if="errorMessage" class="post">{{ errorMessage }}</div>
      <p v-else-if="isLoading" class="feed-status">Loading posts…</p>

      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post-id="post.id"
      />

      <button
        v-if="posts.length"
        type="button"
        class="reset-likes"
        @click="resetLikes"
      >
        Reset likes
      </button>
    </section>

    <div class="side-panel" aria-hidden="true"></div>
  </main>
</template>
