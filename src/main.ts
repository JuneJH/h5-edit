import { createApp } from 'vue';
import {createPinia} from 'pinia';
import './assets/css/reset.css';
import App from './App.vue';
import router from './router';
import JText from './components/J-Text.vue';
import {Input,InputNumber,Select,SelectOption} from 'ant-design-vue'




const app = createApp(App);

app.component("j-text",JText);
app.component("j-input",Input);
app.component("j-input-number",InputNumber);
app.component("j-select",Select);
app.component("j-select-option",SelectOption);

const pinia = createPinia();
app.use(pinia);
app.use(router)
app.mount('#app');
