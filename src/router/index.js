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
				{ path: '/grupos', component: Grupos },
				{
					path: '/agenda',
					component: Agenda,
					children: [
						{ path: '/agenda/ancianos', component: Ancianos },
						{ path: '/agenda/ministeriales', component: Ministeriales },
					],
				},
			],
		},
	],
})

export default router
