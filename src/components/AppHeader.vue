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
