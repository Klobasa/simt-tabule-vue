import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/src/jquery.js";
import "bootstrap/dist/js/bootstrap.min.js";
import { VueCookieNext } from "vue-cookie-next";

const app = createApp(App)
app.use(router)
app.use(VueCookieNext)

app.config.globalProperties.beUrl = "https://simt-tabule.ga:8443/"

app.mount("#app")
