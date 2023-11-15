<script setup>
import { RouterLink } from 'vue-router'
import { user, eliminarDocumento } from '@db'

const props = defineProps({
	numero: Number,
	responsable: String,
	id: String,
})

const emits = defineEmits(['eliminarGrupo'])

function eliminarGrupo(idGrupo) {
	eliminarDocumento('grupos', idGrupo)
	emits('eliminarGrupo')
}

const ruta = `/grupos/${props.numero}`
</script>
<template>
	<div class="card card-person">
		<div class="card-header d-flex justify-content-around align-items-center">
			<h5>Grupo {{ props.numero }}</h5>
			<a
				v-if="user.uid"
				@click="eliminarGrupo(props.id)"
				type="button"
				class="text-danger"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="20"
					fill="currentColor"
					class="bi bi-trash3"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
					/>
					<path
						d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
					/>
				</svg>
			</a>
		</div>
		<div class="card-body d-flex flex-column justify-content-between">
			<h5 class="card-title">{{ props.responsable }}</h5>
			<div>
				<RouterLink class="btn btn-primary mt-3" :to="ruta">Listado</RouterLink>
			</div>
		</div>
	</div>
</template>

<style scoped>
h5 {
	width: 100%;
}

.card-person {
	max-width: 400px;
	min-width: 250px;
}
</style>
