import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import 'bootswatch/dist/spacelab/bootstrap.min.css'
import "bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);



app.mount("#app");


