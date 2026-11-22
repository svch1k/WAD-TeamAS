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
