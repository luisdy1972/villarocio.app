import { createRouter, createWebHistory } from 'vue-router'

import { Home, Grupos, Agenda, Ancianos, Ministeriales, Grupo } from '@/pages'

import { Layout } from '@/view'
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: Layout,
			children: [
				{ path: '/', component: Home },
				{
					path: '/grupos',
					component: Grupos,
					children: [{ path: '/grupos/:numero', component: Grupo }],
				},
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
	scrollBehavior(to, from, savedPosition) {
		// console.log(to, from)
		if (to.path == '/agenda/ancianos' || to.path == '/agenda/ministeriales') {
			return { el: '#asignaciones', top: 150 }
		} else {
			return { top: 0 }
		}
	},
})

export default router
