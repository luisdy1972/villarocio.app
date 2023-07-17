import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './assets/js/bootstrap'
import './assets/css/bootstrap.css'

import App from './App.vue'

// componenetes
import Home from './assets/components/Home.vue'
import About from './assets/components/About.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{ path: '/', component: Home },
		{ path: '/home', component: Home },
		{ path: '/about', component: About },
	],
})

createApp(App).use(router).mount('#app')
