<script setup>
import { ref, onMounted, renderList } from 'vue'
import CardGup from './CardGup.vue'
// import CardPerson from './CardPerson.vue'
import Carousel from './Carousel.vue'

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
	axios
		.get(rutas.ministeriales)
		.then(function (res) {
			ministeriales.value = res.data
			// console.log(ministeriales.value)
		})
		.catch(function (err) {
			console.error(err)
		})
})
</script>
<template>
	<div class="contenedor-principal">
		<Carousel />
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
		<section class="container mb-5">
			<h2 class="pt-4">Arreglos de conferencias</h2>
			<h6 class="ps-4">Clic para ir a la agenda:</h6>
			<ul class="list-group list-group-flush">
				<h5>Ancianos</h5>
				<li class="list-group-item" v-for="anciano in ancianos">
					<a
						class="item-con-enlace"
						target="_blank"
						:href="anciano.linkAgenda"
						>{{ anciano.nombre }}</a
					>
				</li>
				<h5 class="mt-3">Ministeriales</h5>
				<li class="list-group-item" v-for="ministeriale in ministeriales">
					<a
						class="item-con-enlace"
						target="_blank"
						:href="ministeriale.linkAgenda"
						>{{ ministeriale.nombre }}</a
					>
				</li>
			</ul>
			<!-- <div class="d-flex justify-content-center flex-wrap mb-5">
				<CardPerson
					class="m-1"
					v-for="anciano in ancianos"
					:nombre="anciano.nombre"
					:responsabilidad="'Anciano'"
					:linkAgenda="anciano.linkAgenda"
				/>
			</div> -->
		</section>
	</div>
</template>

<style scoped>
.contenedor-principal {
	margin-top: 4.5rem;
}

h2 {
	border-top: solid 1px rgb(185, 185, 185);
}
.item-con-enlace {
	size: 2rem;
	color: black;
	text-decoration: none;
}

.item-con-enlace:hover {
	size: 2rem;
	color: blue;
	text-decoration: none;
}
</style>
