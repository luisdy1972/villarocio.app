<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
	numero: Number,
	responsable: String,
})

const ruta = `/grupos/${props.numero}`
</script>

<template>
	<div class="card card-person">
		<h5 class="card-header">Grupo {{ props.numero }}</h5>
		<div class="card-body">
			<h5 class="card-title">{{ props.responsable }}</h5>
			<RouterLink class="btn btn-primary mt-3" :to="ruta">Informe</RouterLink>
			<!-- <a :href="props.linkInforme" target="_blank" class="btn btn-primary mt-3"
				>Informe</a
			> -->
		</div>
	</div>
</template>

<style scoped>
.card-person {
	max-width: 400px;
	min-width: 250px;
}
</style>
