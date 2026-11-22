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

<style scoped>
.home-layout {
  display: flex;
  gap: 20px;
  margin: 16px 0;
}

.side-panel {
  flex: 1;
  border-radius: var(--page-radius);
  background: #bfbfbf;
  box-shadow: var(--shadow-sm);
}

.feed {
  flex: 3;
  min-width: 0;
}

.feed h1 {
  margin: 0 0 14px;
  font-size: 22px;
  letter-spacing: 0.01em;
  color: var(--text);
}

.feed-status {
  margin: 0;
  color: var(--text-muted);
}

.reset-likes {
  display: block;
  margin: 18px auto 0;
  padding: 9px 22px;
  border: 0;
  border-radius: 999px;
  background-color: #cfe0f5;
  color: var(--text);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.12s ease;
}

.reset-likes:hover {
  background-color: #b9d3f0;
}

.reset-likes:active {
  transform: translateY(1px);
}

@media (max-width: 700px) {
  .feed h1 {
    font-size: 20px;
  }
}

@media (max-width: 600px) {
  .home-layout {
    flex-direction: column;
  }

  .side-panel {
    display: none;
  }
}
</style>
