import { createApp } from "vue";

/**
 * Vue root component
 */
import App from "@/App.vue";

/**
 * Global CSS
 */
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/variable.css";
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/variable.css";
import "@/assets/normalize.css";

/**
 * Global component
 */
import Icon from "@/components/Icon.vue";

/**
 * Vue application
 */
const app = createApp(App);

app.component("Icon", Icon);

app.mount("#app");
