<script setup>
// modulos
import { ref, onMounted } from 'vue'

// componentes
import NavBar from './assets/components/NavBar.vue'
import Carousel from './assets/components/Carousel.vue'
import CardGup from './assets/components/CardGup.vue'

// librerias
import axios from 'axios'
const rutagrupos =
	'https://villarocio-ba5a1-default-rtdb.europe-west1.firebasedatabase.app/grupos.json'

const grupos = ref([''])
// const ministeriales = ref([''])

onMounted(() => {
	axios
		.get(rutagrupos)
		.then(function (response) {
			grupos.value = response.data
			// console.log(response.data)
			console.log(grupos.value)
		})
		.catch(function (error) {
			console.error(error)
		})
})
</script>

<template>
	<NavBar />
	<div class="contenedor-principal">
		<Carousel class="mb-5" />
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
		<section class="container">
			<h2 class="p-4">Arreglos de conferencias</h2>
			<p>En proceso...</p>
		</section>
	</div>
	<div></div>
</template>

<style scoped>
.contenedor-principal {
	margin-top: 4rem;
}

h2 {
	border-top: solid 1px rgb(185, 185, 185);
}
</style>
