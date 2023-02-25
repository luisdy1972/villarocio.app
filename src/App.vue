<script setup>
import NavBar from "./assets/components/NavBar.vue";
import MapImg from "./assets/components/MapImg.vue";
</script>

<template>
	<NavBar />
	<div class="contenedor-principal">
		<MapImg />
	</div>
</template>

<style scoped>
.contenedor-principal {
	margin-top: 4rem;
}
</style>
