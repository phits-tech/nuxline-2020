import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import * as Pages from '@/pages'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '',
    component: Pages.SiteRoot,
    children: [
      {
        path: '/',
        name: 'landing',
        component: Pages.LandingPage
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: Pages.SchedulePage
      },
      {
        path: 'apply',
        name: 'apply',
        component: Pages.ApplyPage
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
