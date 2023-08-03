<script setup>
const props = defineProps({
	numero: Number,
	responsable: String,
	linkInforme: String,
})
</script>

<template>
	<div class="card card-person">
		<h5 class="card-header">Grupo {{ props.numero }}</h5>
		<div class="card-body">
			<h5 class="card-title">{{ props.responsable }}</h5>
			<a :href="props.linkInforme" target="_blank" class="btn btn-primary mt-3"
				>Informe</a
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
