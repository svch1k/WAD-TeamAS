<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import AvatarLogo from "./AvatarLogo.vue";

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters.currentUser);

const isOpen = ref(false);
const menuRoot = ref(null);
const toggleButton = ref(null);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}

function logout() {
  closeMenu();
  store.dispatch("logout");
  router.push({ name: "home" });
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
      <p class="user-menu-name">{{ user?.name }}</p>
      <a
        class="user-menu-email"
        :href="`mailto:${user?.email}`"
        @click="closeMenu"
        >{{ user?.email }}</a
      >
      <button type="button" class="user-menu-logout" @click="logout">
        logout
      </button>
    </div>
  </div>
</template>
