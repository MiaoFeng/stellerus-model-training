import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/home/homePage.vue'

const routes = [
  {
    path: '/',
    component: Home,
    children: [{ path: '', component: Home }],
  },
  {
    path: '/home',
    component: Home,
    children: [{ path: '', component: Home }],
  },
]

export default createRouter({
  //确定basename， Basename用于在部署应用时，当应用不是部署在域名的根路径下，而是部署在子路径时，Vue Router能够正确地进行路由
history: createWebHistory("/stellerus-tech-models"),
routes,
})