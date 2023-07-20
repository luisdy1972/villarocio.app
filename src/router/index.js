import { createRouter, createWebHistory } from 'vue-router'

import { Grupos, Ancianos, Ministeriales, Carousel } from '@/components/'
import { Home } from '@/view'
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Home,
			children: [
				{ path: '/', component: Carousel },
				{ path: '/ministeriales', component: Ministeriales },
				{ path: '/ancianos', component: Ancianos },
			],
		},
	],
})

export default router
