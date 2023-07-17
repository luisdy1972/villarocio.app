import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Ancianos from '@/components/Ancianos.vue'
import Ministeriales from '@/components/Ministeriales.vue'

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
