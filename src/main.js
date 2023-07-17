import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './assets/js/bootstrap'
import './assets/css/bootstrap.css'

import App from './App.vue'

// componenetes
import Home from './assets/components/Home.vue'
import Ancianos from './assets/components/Ancianos.vue'
import Ministeriales from './assets/components/Ministeriales.vue'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home,
			children: [
				{ path: '/ministeriales', component: Ministeriales },
				{ path: '/ancianos', component: Ancianos },
			],
		},
	],
})

createApp(App).use(router).mount('#app')
