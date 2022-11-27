import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGtag from "vue-gtag";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { VueCookieNext } from "vue-cookie-next";

const app = createApp(App)
app.use(router)
app.use(VueCookieNext)

app.use(VueGtag, {
  config: { id: "G-9L8M7ZGG90" }
}, router)

app.mount("#app")
