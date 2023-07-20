<script setup>
import { ref, onMounted } from 'vue'

import { CardGup, Carousel } from '@/components'

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
	<div class="contenedor-principal">
		<section class="container">
			<Carousel />
			<h2 class="pt-4 border-button">Información general</h2>
			En este sitio web, podrá:
			<ul class="pb-4 me-5">
				<li>Visualizar y descargar el mapa del territorio general.</li>
				<li>Ver una lista de grupos.</li>
				<li>Generar informes mensuales.</li>
				<li>Revisar agendas personales de conferencias.</li>
				<li>Ver acuerdos de conferencias con otras congregaciones.</li>
			</ul>
			<h2 class="p-4 border-top">Gupos</h2>
			<div class="d-flex justify-content-center flex-wrap mb-5">
				<CardGup
					class="m-1"
					v-for="grupo in grupos"
					:numero="grupo.numero"
					:responsable="grupo.resposable"
					:linkInforme="grupo.linkInforme"
				/>
			</div>
			<h2 class="p-4 border-top">Discursos públicos</h2>
			<div class="container mb-2">
				<div class="d-flex justify-content-center">
					<iframe
						class="shadow p-1 mb-5"
						src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=2&amp;bgcolor=%23ffffff&amp;ctz=America%2FBogota&amp;showTitle=0&amp;showPrint=0&amp;showCalendars=0&amp;showTz=0&amp;src=YWNjZDA1ZmQ5ZDU4YmY3YjgyOWVlNjU3OGQ4NjViNDU4NmQwNGIxZjI0MmNjZDRlMjk3MDM0ZTQzN2NlYmRlNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23F4511E"
						style="border-width: 0"
						width="1000"
						height="600"
						frameborder="0"
						scrolling="no"
					>
					</iframe>
				</div>
			</div>
		</section>
		<section class="container mb-5">
			<div class="d-flex justify-content-between border-top pt-4">
				<h3>Arreglos de conferencias</h3>
				<div class="d-flex gap-3">
					<router-link to="/ancianos">
						<button class="btn btn btn-primary">Ancianos</button>
					</router-link>
					<router-link to="/ministeriales">
						<button class="btn bbtn btn-secondary">Ministeriales</button>
					</router-link>
				</div>
			</div>
			<router-view></router-view>
		</section>
	</div>
</template>

<style scoped>
.contenedor-principal {
	margin-top: 4.5rem;
}
</style>
