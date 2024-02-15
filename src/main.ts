import './assets/main.css'

import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './views/HomePage.vue'
import FavoritesPage from './views/FavoritesPage.vue'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesPage
    }
  ]
})

app.use(autoAnimatePlugin)

app.use(router)

app.mount('#app')
