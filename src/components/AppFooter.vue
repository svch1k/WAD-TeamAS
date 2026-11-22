<script setup>
// Task 3: shared footer with the usual footer information (copyright).
</script>

<template>
  <footer class="site-footer">
    <p>© 2026 PostIt. Created by Team AS.</p>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 20px;
  padding: 14px;
  border-radius: var(--page-radius);
  background-color: var(--surface-dark);
  color: var(--text-muted);
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.site-footer p {
  margin: 0;
  font-size: 14px;
}

@media (max-width: 700px) {
  .site-footer {
    margin-top: 14px;
    padding: 12px;
  }
}
</style>
