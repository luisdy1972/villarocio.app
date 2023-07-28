<script setup>
import { ref, onMounted } from 'vue'

import { CardGrup } from '@/components'

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
		<h2 class="pt-4 pb-3 mb-4 border-bottom">Gupos</h2>
		<div class="d-flex justify-content-center flex-wrap mb-5">
			<CardGrup
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
