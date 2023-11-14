<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { user, db, buscarDocumentos, guardarActualizarDocumento } from '@db'

const { params } = useRoute()
const publicadores = ref([])
const nuevoPublicador = ref({
	nombre: '',
	bautizado: false,
	anciano: false,
	auxiliar: false,
	regular: false,
	horas: 0,
	comentario: '',
	estudios: 0,
	grupo: Number(params.numero),
	informe: false,
	ministerial: false,
})

function buscarPublicadoresPorGrupo(numeroGrupo) {
	// console.log('Grupo: ' + Number(numeroGrupo))
	buscarDocumentos('publicadores', ['grupo', '==', Number(numeroGrupo)])
		.then((res) => {
			console.log(res)
			publicadores.value = res
		})
		.catch((err) => {
			console.error(err)
		})
}

function agregarPublicador() {}

onMounted(() => {
	buscarPublicadoresPorGrupo(params.numero)
})
</script>
<template>
	<div class="container pt-5">
		<ul id="listado-grupo" class="list-group mb-5">
			<div class="list-group-item active">
				<b> Grupo Número {{ params.numero }}</b>
			</div>
			<div class="list-group-item"><b>Publicadores</b></div>
			<li
				v-for="publicador in publicadores"
				class="list-group-item list-group-item-action ps-4"
			>
				{{ publicador.nombre }}
			</li>
			<div class="list-group-item"><b>Precursores Auxiliares</b></div>
			<div class="list-group-item"><b>Precursores Regulares</b></div>
			<div class="list-group-item"><b>Precursores Especiales</b></div>
		</ul>

		<!-- agregar Publicador -->
		<div class="container d-flex justify-content-center">
			<form
				@submit.prevent="agregarPublicador()"
				id="nuevo-publicador"
				class="card"
			>
				<h4 class="card-header">Añadir nuevo publicador</h4>
				<div class="card-body m-2 d-flex flex-column">
					<div class="input-group mb-3">
						<span class="input-group-text" for="nombre">Nombre: </span>
						<input
							type="text"
							class="form-control"
							id="nombre"
							required
							:model="nuevoPublicador.nombre"
						/>
					</div>
					<div class="ms-3">
						<label for="bautizado">Bautizado</label>
						<input
							type="checkbox"
							class="form-check-input ms-1"
							id="bautizado"
							:model="nuevoPublicador.bautizado"
						/>
						<div>
							<div>
								<label for="publicador">Publicador</label>
								<input
									class="ms-2"
									type="radio"
									id="publicador"
									checked
									name="precursor"
								/>
							</div>
							<div class="d-flex gap-4">
								<div>
									<label for="auxiliar">Precursor Auxiliar</label>
									<input
										class="ms-2"
										type="radio"
										name="precursor"
										id="auxiliar"
										:model="nuevoPublicador.auxiliar"
									/>
								</div>
								<div>
									<label for="regular">Regular</label>
									<input
										class="ms-2"
										type="radio"
										id="regular"
										name="precursor"
										:model="nuevoPublicador.regular"
									/>
								</div>
							</div>
						</div>
						<div class="d-flex gap-4">
							<div>
								<label for="ministerial">Ministerial</label>
								<input
									class="form-check-input ms-1"
									type="checkbox"
									id="ministerial"
									:model="nuevoPublicador.ministerial"
								/>
							</div>
							<div>
								<label for="anciano">Anciano</label>
								<input
									class="form-check-input ms-1"
									type="checkbox"
									id="anciano"
									:model="nuevoPublicador.anciano"
								/>
							</div>
						</div>
					</div>
					<button class="btn btn-primary mt-3">Agregar</button>
				</div>
			</form>
		</div>
	</div>
</template>

<style scoped>
#nuevo-publicador {
	min-width: 40%;
}
</style>
