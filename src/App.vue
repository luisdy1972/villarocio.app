<script setup>
// modulos
import { ref, onMounted } from 'vue'

// componentes
import NavBar from './assets/components/NavBar.vue'
import Carousel from './assets/components/Carousel.vue'
import CardGup from './assets/components/CardGup.vue'
import CardPerson from './assets/components/CardPerson.vue'

// librerias
import axios from 'axios'
const rutas = {
	grupos:
		'https://villarocio-ba5a1-default-rtdb.europe-west1.firebasedatabase.app/grupos.json',
	ancianos:
		'https://villarocio-ba5a1-default-rtdb.europe-west1.firebasedatabase.app/ancianos.json',
	ministeriales:
		'https://villarocio-ba5a1-default-rtdb.europe-west1.firebasedatabase.app/ministeriales.json',
}

const grupos = ref([''])
const ancianos = ref([''])
const ministeriales = ref([''])

onMounted(() => {
	axios
		.get(rutas.grupos)
		.then(function (response) {
			grupos.value = response.data
			// console.log(response.data)
			// console.log(grupos.value)
		})
		.catch(function (error) {
			console.error(error)
		})

	axios
		.get(rutas.ancianos)
		.then(function (res) {
			ancianos.value = res.data
			// console.log(ancianos.value)
		})
		.catch(function (err) {
			console.error(err)
		})
})

axios
	.get(rutas.ministeriales)
	.then(function (res) {
		ministeriales.value = res.data
		console.log(ministeriales.value)
	})
	.catch(function (err) {
		console.error(err)
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
			<div class="d-flex justify-content-center flex-wrap mb-5">
				<CardPerson
					class="m-1"
					v-for="anciano in ancianos"
					:nombre="anciano.nombre"
					:responsabilidad="'Anciano'"
					:linkAgenda="anciano.linkAgenda"
				/>
				<div class="d-flex justify-content-center flex-wrap mb-5">
					<CardPerson
						class="m-1"
						v-for="minisretial in ministeriales"
						:nombre="minisretial.nombre"
						:responsabilidad="'Ministerial'"
						:linkAgenda="minisretial.linkAgenda"
					/>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.contenedor-principal {
	margin-top: 4rem;
}

h2 {
	border-top: solid 1px rgb(185, 185, 185);
}
</style>
