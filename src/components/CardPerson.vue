<script setup>
const props = defineProps({
	nombre: String,
	linkAgenda: String,
	responsabilidad: String,
})
</script>

<template>
	<div class="card card-person">
		<h5 class="card-header">{{ props.nombre }}</h5>
		<div class="card-body">
			<h6 class="card-title">{{ props.responsabilidad }}</h6>
			<a :href="props.linkAgenda" target="_blank" class="btn btn-primary mt-3"
				>Agenda</a
			>
		</div>
	</div>
</template>

<style scoped>
.card-person {
	max-width: 400px;
	min-width: 250px;
}
</style>
