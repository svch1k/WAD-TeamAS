<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import AvatarLogo from "./AvatarLogo.vue";

const isOpen = ref(false);
const menuRoot = ref(null);
const toggleButton = ref(null);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}

function onDocumentClick(event) {
  if (!isOpen.value) {
    return;
  }

  if (menuRoot.value && !menuRoot.value.contains(event.target)) {
    closeMenu();
  }
}

function onDocumentKeydown(event) {
  if (event.key === "Escape" && isOpen.value) {
    closeMenu();
    toggleButton.value?.focus();
  }
}

onMounted(() => {
  document.addEventListener("click", onDocumentClick);
  document.addEventListener("keydown", onDocumentKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocumentClick);
  document.removeEventListener("keydown", onDocumentKeydown);
});
</script>

<template>
  <div ref="menuRoot" class="user-menu">
    <button
      ref="toggleButton"
      type="button"
      class="user-menu-toggle"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      aria-controls="userMenu"
      aria-label="Open user menu"
      @click="toggleMenu"
    >
      <AvatarLogo />
    </button>

    <div v-show="isOpen" id="userMenu" class="user-menu-list">
      <p class="user-menu-name">John Doe</p>
      <a class="user-menu-email" href="mailto:john.doe@ut.ee" @click="closeMenu"
        >john.doe@ut.ee</a
      >
      <RouterLink class="user-menu-logout" to="/signup" @click="closeMenu"
        >logout</RouterLink
      >
    </div>
  </div>
</template>
