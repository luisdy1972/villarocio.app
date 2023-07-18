import { createRouter, createWebHistory } from 'vue-router'

// import Home from '@/component/home.vue'
import { Home, Ancianos, Ministeriales } from '@/components/'
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

export default router
