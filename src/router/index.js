import { createRouter, createWebHistory } from 'vue-router'

import {
	Grupos,
	Ancianos,
	Ministeriales,
	Carousel,
	Agenda,
} from '@/components/'
import { Layout } from '@/view'
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Layout,
			children: [
				{ path: '/', component: Carousel },
				{ path: '/ancianos', component: Ancianos },
				{ path: '/agenda', component: Agenda },
				{ path: '/grupos', component: Grupos },
				{ path: '/ministeriales', component: Ministeriales },
			],
		},
	],
})

export default router
