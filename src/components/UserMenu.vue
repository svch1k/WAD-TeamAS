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

<style scoped>
.user-menu {
  position: relative;
  display: flex;
  align-items: center;
}

.user-menu-toggle {
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: none;
  line-height: 0;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.user-menu-toggle:hover {
  background-color: rgba(255, 255, 255, 0.6);
}

.user-menu-toggle[aria-expanded="true"] {
  background-color: rgba(255, 255, 255, 0.85);
  box-shadow: inset 0 0 0 1px rgba(20, 24, 29, 0.12);
}

.user-menu-toggle .avatar {
  border-radius: 6px;
}

.user-menu-list {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-width: 190px;
  max-width: calc(100vw - 32px);
  padding: 12px 16px;
  border-radius: 10px;
  background-color: #d9d9d9;
  box-shadow: 0 8px 22px rgba(20, 24, 29, 0.18);
  text-align: left;
}

.user-menu-name,
.user-menu-email,
.user-menu-logout {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #14181d;
}

.user-menu-name {
  font-weight: 700;
  white-space: nowrap;
}

.user-menu-email {
  text-decoration: none;
  word-break: break-word;
}

.user-menu-email:hover {
  text-decoration: underline;
}

.user-menu-logout {
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: none;
  font-family: inherit;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}

.user-menu-logout:hover {
  color: #24568b;
  text-decoration: underline;
}
</style>
