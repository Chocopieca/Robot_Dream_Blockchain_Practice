import { createRouter, createWebHistory } from 'vue-router'
import {defineAsyncComponent} from "@vue/runtime-core";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: defineAsyncComponent(() => import("../views/EtherPage.vue")),
      meta: {
        layout: "DefaultLayout",
      },
    },
  ]
})

export default router
