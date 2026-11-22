<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const email = ref("");
const password = ref("");
const hasSubmitted = ref(false);

const passwordRules = [
  {
    label: "Is between 8 and 14 characters long",
    test: (value) => value.length >= 8 && value.length < 15,
  },
  {
    label: "Includes at least one uppercase letter",
    test: (value) => /[A-Z]/.test(value),
  },
  {
    label: "Includes at least two lowercase letters",
    test: (value) => (value.match(/[a-z]/g) ?? []).length >= 2,
  },
  {
    label: "Includes at least one numeric value",
    test: (value) => /\d/.test(value),
  },
  {
    label: "Starts with an uppercase letter",
    test: (value) => /^[A-Z]/.test(value),
  },
  {
    label: 'Includes the character "_"',
    test: (value) => value.includes("_"),
  },
];

const unmetRules = computed(() =>
  passwordRules
    .filter((rule) => !rule.test(password.value))
    .map((rule) => rule.label),
);

const showError = computed(
  () =>
    unmetRules.value.length > 0 &&
    (password.value.length > 0 || hasSubmitted.value),
);

const errorMessage = computed(
  () => `the password is not valid - ${unmetRules.value.join(", ")}`,
);

function onSubmit() {
  hasSubmitted.value = true;

  if (unmetRules.value.length > 0) {
    return;
  }

  store.dispatch("login", email.value);
  router.push({ name: "home" });
}
</script>

<template>
  <main class="signup-view">
    <form class="signup-form" @submit.prevent="onSubmit">
      <div class="form-row">
        <label for="signupEmail">Email</label>
        <input
          id="signupEmail"
          v-model="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>

      <div class="form-row">
        <label for="signupPassword">Password</label>
        <input
          id="signupPassword"
          v-model="password"
          type="password"
          placeholder="Password"
        />
      </div>

      <p v-if="showError" class="signup-error" role="alert">
        {{ errorMessage }}
      </p>

      <button type="submit" class="signup-button">Signup</button>
    </form>
  </main>
</template>
