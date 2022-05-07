import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:"/shop/:id",
    component:()=>import("../views/statusView.vue"),
    name:"status"
  },
  {
    path:"/list",
    component:()=>import("../views/shopListView.vue"),
    name:"shop list"
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
