import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
// Router
import router from './router/router.js';
const app = createApp(App)

app.use(router);
app.mount('#app');
