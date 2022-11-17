import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
// import bem from "./mixins/bem";


const app = createApp(App);
// app.mixin(bem);
app.use(router);
app.mount("#app");
