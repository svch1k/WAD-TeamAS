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

<style scoped>
.signup-view {
  width: min(100%, 420px);
  margin: 40px auto;
  padding: 28px 24px;
  border-radius: 16px;
  background-color: #eef2e4;
  box-shadow: var(--shadow-sm);
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.signup-form .form-row {
  display: grid;
  grid-template-columns: 90px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.signup-form label {
  font-weight: 500;
  color: var(--text);
}

.signup-form input {
  width: 100%;
  height: 38px;
}

.signup-error {
  margin: 0;
  padding: 10px 12px;
  border-radius: 8px;
  background-color: #fdecea;
  color: #b3261e;
  font-size: 14px;
  line-height: 1.45;
}

.signup-button {
  align-self: center;
  margin-top: 6px;
  padding: 9px 26px;
  border: 0;
  border-radius: 999px;
  background-color: var(--accent);
  color: #ffffff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.12s ease;
}

.signup-button:hover {
  background-color: var(--accent-hover);
}

.signup-button:active {
  transform: translateY(1px);
}

@media (max-width: 600px) {
  .signup-view {
    margin: 24px auto;
    padding: 20px 16px;
  }

  .signup-form .form-row {
    grid-template-columns: minmax(0, 1fr);
    gap: 4px;
    align-items: start;
  }
}
</style>
