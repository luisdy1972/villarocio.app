<script setup>
import { ref, onMounted } from 'vue'

import { CardGrup, Loading } from '@/components'

import { user, buscarDocumentos, guardarActualizarDocumento } from '@db'

const grupos = ref([])
const nuevoGrupo = ref({
	responsable: undefined,
	numero: undefined,
})

function buscarGrupos() {
	buscarDocumentos('grupos')
		.then((documentos) => {
			grupos.value = documentos
		})
		.catch((err) => {})
}
function guardarNuevoGrupo() {
	guardarActualizarDocumento('grupos', nuevoGrupo.value).then(() => {
		grupos.value = []
		nuevoGrupo.value = {
			responsable: undefined,
			numero: undefined,
		}
		buscarGrupos()
	})
}
function recargarGrupos() {
	grupos.value = []
	buscarGrupos()
}

function corazon() {
	console.log('♥ Grupos')
}

onMounted(() => {
	buscarGrupos()
})
</script>
<template>
	<section class="container">
		<!-- <button class="btn btn-primary" @click="corazon()">♥</button> -->
		<h2 class="pt-4 pb-3 mb-4 border-bottom">Gupos</h2>
		<div v-if="grupos.length == 0">
			<Loading></Loading>
		</div>
		<div class="d-flex justify-content-center flex-wrap mb-5">
			<CardGrup
				class="m-1"
				v-for="grupo in grupos"
				@eliminarGrupo="recargarGrupos()"
				:numero="grupo.numero"
				:responsable="grupo.responsable"
				:id="grupo.id"
			/>
			<!-- agregar grupo -->
			<div v-if="user.uid" class="card card-person m-1">
				<h5 class="card-header">Agregar Grupo</h5>
				<form
					@submit.prevent="guardarNuevoGrupo()"
					class="card-body d-flex flex-column justify-content-center"
				>
					<input
						required
						type="text"
						placeholder="Responsable"
						v-model="nuevoGrupo.responsable"
						class="form-control"
					/>
					<input
						required
						type="number"
						placeholder="Número"
						v-model="nuevoGrupo.numero"
						class="form-control mt-3"
					/>
					<button
						v-if="nuevoGrupo.responsable && nuevoGrupo.numero"
						type="submit"
						class="btn btn-primary mt-3"
					>
						Agregar
					</button>
					<a v-else class="btn btn-primary mt-3">Agregar</a>
				</form>
			</div>
		</div>
		<div id="listado-grupo">
			<RouterView></RouterView>
		</div>
	</section>
</template>

<style scoped></style>
