import 'bootstrap/dist/css/bootstrap.min.css';
import './css/app.css';
import './services/firebase.js';
import './services/firestore.js';

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";

const app = createApp(App);

app.use(router);

app.mount('#app');