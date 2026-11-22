<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import UserMenu from "./UserMenu.vue";

const store = useStore();

const isLoggedIn = computed(() => store.getters.isLoggedIn);
</script>

<template>
  <header class="site-header">
    <nav aria-label="Main navigation">
      <RouterLink to="/">Home</RouterLink>

      <template v-if="isLoggedIn">
        <span aria-hidden="true">|</span>
        <RouterLink to="/add-post">Add Post</RouterLink>
      </template>

      <template v-else>
        <span aria-hidden="true">|</span>
        <RouterLink to="/signup">Signup</RouterLink>
      </template>
    </nav>

    <UserMenu v-if="isLoggedIn" />
  </header>
</template>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border-radius: var(--page-radius);
  background-color: var(--surface-dark);
  box-shadow: var(--shadow-sm);
}

nav {
  display: flex;
  align-items: center;
  gap: 4px;
}

nav a {
  padding: 8px 12px;
  border-radius: 8px;
  color: #3a4046;
  font-weight: 500;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

nav a:hover,
nav a[aria-current="page"] {
  background-color: rgba(255, 255, 255, 0.6);
  color: var(--text);
}

@media (max-width: 700px) {
  .site-header {
    padding: 8px 10px;
  }

  nav a {
    padding: 8px 10px;
    font-size: 15px;
  }
}
</style>
