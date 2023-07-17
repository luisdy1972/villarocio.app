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
</script>
<template>
	<ul class="list-group list-group-flush">
		<div class="list-group-item">
			<a
				v-for="anciano in ancianos"
				type="button"
				class="list-group-item list-group-item-action"
				target="_blank"
				:href="anciano.linkAgenda"
			>
				{{ anciano.nombre }}
			</a>
		</div>
	</ul>
</template>
