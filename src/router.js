import Vue from 'vue'
import Router from 'vue-router'
import Communities from './pages/communities.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'communities',
      component: Communities
    },
    {
      path: '/communities/:communityID/:amount',
      name: 'detail',
      props: true,
      component: () => import('./pages/community-detail.vue')
    }
  ]
})
