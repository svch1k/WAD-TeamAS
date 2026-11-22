<script setup>
const avatarUrl = `${import.meta.env.BASE_URL}images/avatar.svg`;
</script>

<template>
  <img class="avatar" :src="avatarUrl" alt="" />
</template>

<style scoped>
.avatar {
  display: block;
  width: 34px;
  height: 34px;
}
</style>
