<script setup>
import { ref, onMounted } from 'vue'
// librerias

import axios from 'axios'
import rutas from '@/assets/js/rutasBD'

const ministeriales = ref([''])

onMounted(() => {
	axios
		.get(rutas.ministeriales)
		.then(function (res) {
			ministeriales.value = res.data
		})
		.catch(function (err) {
			console.error(err)
		})
})
</script>
<template>
	<ul class="list-group list-group-flush">
		<div class="list-group-item">
			<a
				v-for="ministeriale in ministeriales"
				type="button"
				class="list-group-item list-group-item-action"
				target="_blank"
				:href="ministeriale.linkAgenda"
			>
				{{ ministeriale.nombre }}
			</a>
		</div>
	</ul>
</template>
