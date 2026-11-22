<script setup>
import UserMenu from "./UserMenu.vue";
</script>

<template>
  <header class="site-header">
    <nav aria-label="Main navigation">
      <RouterLink to="/">Home</RouterLink>
      <span aria-hidden="true">|</span>
      <RouterLink to="/signup">Signup</RouterLink>
      <span aria-hidden="true">|</span>
      <RouterLink to="/add-post">Add Post</RouterLink>
    </nav>

    <UserMenu />
  </header>
</template>
