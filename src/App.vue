<script setup>
import NavBar from "./assets/components/NavBar.vue";
import MapImg from "./assets/components/MapImg.vue";
import Carousel from "./assets/components/Carousel.vue";
</script>

<template>
	<NavBar />
	<div class="contenedor-principal">
		<Carousel class="mb-5" />
		<article class="container">
			<h2>Herramientas</h2>
			<MapImg />
		</article>
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
