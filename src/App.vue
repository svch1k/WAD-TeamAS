<script setup>
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

<template>
  <div class="page">
    <AppHeader />
    <RouterView />
    <AppFooter />
  </div>
</template>

<style>
/* global styles: variables, page base, form controls */
:root {
  --page-radius: 12px;
  --card-radius: 12px;
  --surface: #d9d9d9;
  --surface-dark: #bfbfbf;
  --text: #14181d;
  --text-muted: #4b5158;
  --accent: #24568b;
  --accent-hover: #1c456f;
  --shadow-sm: 0 1px 2px rgba(20, 24, 29, 0.1);
  --shadow-md: 0 8px 20px rgba(20, 24, 29, 0.14);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    "Segoe UI", system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif;
  line-height: 1.55;
  color: var(--text);
  background: white;
  -webkit-font-smoothing: antialiased;
}

:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

input,
textarea,
select {
  font-family: inherit;
  font-size: 15px;
  color: var(--text);
  background-color: #ffffff;
  border: 1px solid #b9bec4;
  border-radius: 8px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

input:not([type="file"]) {
  padding: 0 12px;
}

textarea,
select {
  padding: 9px 12px;
}

input::placeholder,
textarea::placeholder {
  color: #6b7076;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(36, 86, 139, 0.25);
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
</style>

<style scoped>
.page {
  max-width: 960px;
  margin: 20px auto;
  padding: 0 16px;
}

@media (max-width: 600px) {
  .page {
    margin: 12px auto;
    padding: 0 10px;
  }
}
</style>
