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
function copiarTexto(texto) {
	navigator.clipboard.writeText(texto)
	console.log(texto)
}
</script>
<template>
	<ul class="list-group list-group-flush">
		<div class="list-group-item">
			<div
				v-for="ministeriale in ministeriales"
				class="list-group-item list-group-item-action d-flex justify-content-between m-1"
			>
				<a
					:href="ministeriale.linkAgenda"
					target="_blank"
					class="text-decoration-none text-secondary fs-5 fw-bold flex-fill"
				>
					{{ ministeriale.nombre }}
				</a>
				<button
					v-on:click="copiarTexto(ministeriale.linkAgenda)"
					type="button"
					class="btn btn-outline-secondary"
				>
					copiar enlace
				</button>
			</div>
		</div>
	</ul>
</template>
