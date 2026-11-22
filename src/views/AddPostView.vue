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

<style scoped>
.add-post-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: gray;
  width: 40%;
  max-width: 450px;
  min-width: 280px;
  margin: 40px auto;
  padding: 30px 20px;
  border-radius: 16px;
}

.add-post-view form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
}

.add-post-view .form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.add-post-view .form-group label {
  color: white;
  font-size: 14px;
}

.add-post-view form textarea,
.add-post-view form input[type="file"] {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: none;
  font-family: inherit;
}

.add-post-view form textarea {
  resize: vertical;
  min-height: 80px;
}

.create-post-button {
  background-color: var(--accent);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.12s ease;
}

.add-post-view .create-post-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 36px;
  border-radius: 6px;
  align-self: center;
  margin-top: 10px;
  text-align: center;
  border: none;
}

.create-post-button:hover {
  background-color: var(--accent-hover);
  box-shadow: var(--shadow-sm);
}

.create-post-button:active {
  transform: translateY(1px);
}
</style>
