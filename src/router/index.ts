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
    component: Pages.Template,
    children: [
      {
        path: '',
        name: 'landing',
        component: Pages.Landing
      },
      {
        path: 'schedule',
        name: 'schedule',
        component: Pages.Schedule
      },
      {
        path: 'hackathon',
        name: 'hackathon',
        component: Pages.Hackathon
      },
      {
        path: 'hackathon-submit',
        name: 'hackathon-submit',
        beforeEnter () {
          location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSd1GK2hU0P6j4KnYcQgwZtlCPKNFJsW7GEAHd6bQUnX365ppQ/viewform'
        }
      },
      {
        path: 'watch-live',
        name: 'watch-live',
        beforeEnter () {
          location.href = 'https://www.youtube.com/watch?v=ONy4puYrwyo'
        }
      },
      {
        path: 'results',
        name: 'results',
        component: Pages.Results
      },
      {
        path: 'apply',
        name: 'apply',
        component: Pages.Apply
      },
      {
        path: 'submit',
        name: 'submit',
        component: Pages.ApplySubmit
      },
      {
        path: 'confirm',
        name: 'confirm',
        component: Pages.ApplyConfirm
      },
      // {
      //   path: 'admin/teams',
      //   name: 'admin-teams',
      //   component: Pages.AdminTeamSummary
      // },
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
