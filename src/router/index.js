import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: (resolve) => {
        require.ensure(['../components/Released.vue'], () => {
          resolve(require('../components/Released.vue'))
        })
      }
    },
    {
      path: '/released',
      name: 'Released',
      component: (resolve) => {
        require.ensure(['../components/Released.vue'], () => {
          resolve(require('../components/Released.vue'))
        })
      }
    },
    {
      path: '/forthcoming',
      name: 'Forthcoming',
      component: (resolve) => {
        require.ensure(['../components/Forthcoming.vue'], () => {
          resolve(require('../components/Forthcoming.vue'))
        })
      }
    },
    {
      path: '/movie/:id',
      name: 'Movie',
      component: (resolve) => {
        require.ensure(['../components/Movie.vue'], () => {
          resolve(require('../components/Movie.vue'))
        })
      }
    },
    {
      path: '/comment/:id',
      name: 'Comment',
      component: (resolve) => {
        require.ensure(['../components/Comment.vue'], () => {
          resolve(require('../components/Comment.vue'))
        })
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: (resolve) => {
        require.ensure(['../components/Search.vue'], () => {
          resolve(require('../components/Search.vue'))
        })
      }
    }
  ]
})
