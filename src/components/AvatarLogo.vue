<script setup>
const avatarUrl = `${import.meta.env.BASE_URL}images/avatar.svg`;
</script>

<template>
  <img class="avatar" :src="avatarUrl" alt="" />
</template>
