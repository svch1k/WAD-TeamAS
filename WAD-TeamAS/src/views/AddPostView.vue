<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function onSubmit() {
  router.push({ name: "home" });
}
</script>

<template>
  <main class="add-post-view">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="PostBody">Post body</label>
        <textarea
          id="PostBody"
          placeholder="Write your post content..."
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="SelectFile">Select file</label>
        <input id="SelectFile" type="file" />
      </div>

      <button type="submit" class="create-post-button">Create post</button>
    </form>
  </main>
</template>
