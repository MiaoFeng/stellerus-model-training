import router from './router/index'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import Echarts from "vue-echarts"
import 'element-plus/dist/index.css'
import './styles/element.scss'
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const pinia = createPinia();
app.use(pinia).component('v-chart', Echarts).use(ElementPlus).use(router).mount('#app')
