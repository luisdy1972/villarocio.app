<script setup>
import { ref, onMounted } from 'vue'
// librerias

import axios from 'axios'
import rutas from '@/assets/js/rutasBD'

const ancianos = ref([''])

onMounted(() => {
	axios
		.get(rutas.ancianos)
		.then(function (res) {
			ancianos.value = res.data
		})
		.catch(function (err) {
			console.error(err)
		})
})

function copiarTexto(texto) {
	navigator.clipboard.writeText(texto)
	// console.log(texto)
}
</script>
<template>
	<ul id="ancianos" class="list-group list-group-flush">
		<div class="list-group-item">
			<div
				v-for="anciano in ancianos"
				class="list-group-item list-group-item-action d-flex justify-content-between m-1"
			>
				<a
					:href="anciano.linkAgenda"
					target="_blank"
					class="text-decoration-none text-primary fs-5 fw-bold flex-fill"
				>
					{{ anciano.nombre }}
				</a>
				<button
					v-on:click="copiarTexto(anciano.linkAgenda)"
					type="button"
					class="btn btn-outline-primary"
				>
					copiar enlace
				</button>
			</div>
		</div>
	</ul>
</template>
