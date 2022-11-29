import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
// app.mixin(bem);
app.use(Antd).use(router).mount("#app");
