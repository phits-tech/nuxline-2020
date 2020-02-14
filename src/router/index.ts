import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import * as Pages from '@/pages'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/', redirect: '/nuxline'
  },
  {
    path: '/line', redirect: '/nuxline'
  },
  {
    path: '/nuxline',
    component: Pages.SiteRoot,
    children: [
      {
        path: '',
        name: 'landing',
        component: Pages.LandingPage
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: Pages.SchedulePage
      },
      {
        path: 'hackathon',
        name: 'hackathon',
        component: Pages.HackathonPage
      },
      {
        path: 'apply',
        name: 'apply',
        component: Pages.ApplyPage
      },
      {
        path: 'submit',
        name: 'submit',
        component: Pages.ApplySubmitPage
      },
      {
        path: 'confirm',
        name: 'confirm',
        component: Pages.ApplyConfirmPage
      },
      {
        path: 'slides',
        beforeEnter () {
          location.href = 'https://docs.google.com/presentation/d/1hC_nX4zxTnxFkNHXDsEFvzOSywraB_4918EPC4M7UMY/edit?usp=sharing'
        }
      },
      {
        path: 'facebook',
        beforeEnter () {
          location.href = 'https://www.facebook.com/events/893212567778050'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
