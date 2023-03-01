<script setup>
import { ref, onMounted } from "vue";

import NavBar from "./assets/components/NavBar.vue";
import MapImg from "./assets/components/MapImg.vue";
import Carousel from "./assets/components/Carousel.vue";

import axios from "axios";

const rutaData = "https://appvillarocio-default-rtdb.firebaseio.com/.json";
const datosJson = ref([]);

onMounted(() => {
	axios
		.get(rutaData)
		.then(function (response) {
			// handle success
			// console.log(response);
			// console.log("HolaResponse");
			datosJson.value = response.data;
			console.log(datosJson.value);
		})
		.catch(function (error) {
			// handle error
			console.log(error);
			console.log("HolaError");
		})
		.finally(function () {
			// always executed
			console.log("♥");
		});
});
</script>

<template>
	<NavBar />
	<div class="contenedor-principal">
		<Carousel class="mb-5" />
		<article class="container">
			<h2>Herramientas</h2>
			<MapImg />
		</article>
		<div class="container"></div>
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
