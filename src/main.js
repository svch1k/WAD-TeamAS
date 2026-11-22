import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./css/normalize.css";
import "./css/style.css";
import "./css/userMenu.css";
import "./css/signup.css";
import "./css/addPost.css";
import "./css/theme.css";

//think about scopes?
createApp(App).use(store).use(router).mount("#app");
