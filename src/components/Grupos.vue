<script setup>
import { ref, onMounted } from 'vue'

import { CardGup } from '@/components'

import axios from 'axios'
import rutas from '@/assets/js/rutasBD'

const grupos = ref([''])

onMounted(() => {
	axios
		.get(rutas.grupos)
		.then(function (response) {
			grupos.value = response.data
			console.log(grupos.value)
		})
		.catch(function (error) {
			console.error(error)
		})

		.catch(function (err) {
			console.error(err)
		})
})
</script>
<template>
	<section class="container">
		<h2 class="p-4">Gupos</h2>
		<div class="d-flex justify-content-center flex-wrap mb-5">
			<CardGup
				class="m-1"
				v-for="grupo in grupos"
				:numero="grupo.numero"
				:responsable="grupo.resposable"
				:linkInforme="grupo.linkInforme"
			/>
		</div>
	</section>
</template>

<style scoped></style>
