import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
// Router
import router from "./router/router.js";
import store from "./store/index.js";

// UI
import BaseCard from "./components/UI/baseCard.vue";
import BaseSearch from "./components/UI/baseSearch.vue";
import BaseProgressbar from "./components/UI/baseProgressbar.vue";

const app = createApp(App);

// Register UI

app.component("base-card", BaseCard);
app.component("base-search", BaseSearch);
app.component("base-progressbar", BaseProgressbar);

app.use(router);
app.use(store);
app.use(PrimeVue);
app.mount("#app");
