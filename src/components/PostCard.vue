<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
});

const store = useStore();

const post = computed(() => store.getters.postById(props.postId));
const likesLabel = computed(() => {
  const likes = post.value?.likes ?? 0;

  return `${likes} ${likes === 1 ? "like" : "likes"}`;
});

function like() {
  store.dispatch("likePost", props.postId);
}

function resolveAsset(src) {
  if (!src) {
    return "";
  }
  // check the regex101 if you didnt get it
  return /^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(src) || src.startsWith("/")
    ? src
    : `${import.meta.env.BASE_URL}${src}`;
}

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
</script>

<template>
  <article v-if="post" class="post">
    <header class="post-header">
      <img
        class="avatar"
        :src="resolveAsset(post.author.avatar)"
        :alt="post.author.name"
        :title="post.author.name"
      />
      <time :datetime="post.createTime">{{ formatDate(post.createTime) }}</time>
    </header>

    <img
      v-if="post.image"
      class="post-image"
      :src="resolveAsset(post.image)"
      :alt="post.imageAlt || ''"
    />

    <p>{{ post.body }}</p>

    <div class="post-actions">
      <button type="button" class="like" aria-label="Like" @click="like">
        👍
      </button>
      <span class="like-count">{{ likesLabel }}</span>
    </div>
  </article>
</template>

<style scoped>
.post {
  padding: 14px 16px;
  border-radius: var(--card-radius);
  background-color: var(--surface);
  box-shadow: var(--shadow-sm);
  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.post:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

.post + .post {
  margin-top: 18px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.avatar {
  display: block;
  width: 34px;
  height: 34px;
}

.post time {
  color: var(--text-muted);
  font-size: 13px;
  letter-spacing: 0.02em;
}

.post > .post-image {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 10px 0 0;
  padding: 0;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
}

.post > p {
  line-height: 1.5;
  margin: 12px 0 10px;
  color: var(--text);
}

.post-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.like {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 46px;
  height: 34px;
  padding: 0 10px;
  border: 0;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.like:hover {
  background-color: #ffffff;
  box-shadow: var(--shadow-sm);
}

.like:active {
  transform: scale(0.94);
}

.like-count {
  color: var(--text-muted);
  font-size: 15px;
}

@media (max-width: 700px) {
  .post {
    padding: 12px;
  }
}
</style>
