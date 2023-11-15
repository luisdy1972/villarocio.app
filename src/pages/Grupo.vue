<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
	user,
	buscarDocumentos,
	guardarActualizarDocumento,
	actualizarDocumento,
} from '@db'

import { Loading, Notification } from '@components'

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
const estudiosPublicadores = ref(0)

function buscarPublicadoresPorGrupo(numeroGrupo) {
	// console.log('Grupo: ' + Number(numeroGrupo))
	buscarDocumentos('publicadores', ['grupo', '==', Number(numeroGrupo)])
		.then((res) => {
			// console.log(res)
			publicadores.value = res
		})
		.catch((err) => {
			console.error(err)
		})
}

function agregarPublicador() {
	// console.log(nuevoPublicador.value)
	guardarActualizarDocumento('publicadores', nuevoPublicador.value)
		.then((result) => {
			publicadores.value = []
			nuevoPublicador.value = {
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
			}
			buscarPublicadoresPorGrupo(params.numero)
		})
		.catch((err) => {
			console.error(err)
		})
}

function onChange(id, data) {
	// console.log(publicadores.value)
	console.log('cambio!')

	actualizarDocumento('publicadores', id, data)
		.then((result) => {
			let estudios = 0
			for (let i in publicadores.value) {
				const estudio = publicadores.value[i].estudios
				estudios += Number(estudio)
				estudiosPublicadores.value = estudios
			}
		})
		.catch((err) => {
			console.error(err)
		})
}

onMounted(() => {
	buscarPublicadoresPorGrupo(params.numero)
})
</script>
<template>
	<div class="container pt-5">
		<h3 class="active">Grupo Número {{ params.numero }}</h3>
		<Loading v-if="publicadores.length == 0"></Loading>
		<table
			v-else
			class="table table-responsive table-sm mt-3 table-bordered table-hover"
		>
			<thead class="table-primary">
				<tr>
					<!-- <th scope="col">#</th> -->
					<th scope="col">Publicadores</th>
					<th v-if="user.uid" scope="col">¿Participó en la predicación?</th>
					<th v-if="user.uid" scope="col">Estudios</th>
					<th v-if="user.uid" scope="col">Comentario</th>
				</tr>
			</thead>
			<tbody>
				<tr scope="row" v-for="publicador in publicadores">
					<!-- <td>#</td> -->
					<td>
						{{ publicador.nombre }}
					</td>
					<td v-if="user.uid">
						<input
							class="form-check-input ms-5"
							type="checkbox"
							v-model="publicador.informe"
							@change="onChange(publicador.id, { informe: publicador.informe })"
						/>
					</td>
					<td v-if="user.uid">
						<input
							type="number"
							v-model="publicador.estudios"
							@input="
								onChange(publicador.id, { estudios: publicador.estudios })
							"
							class="form-control"
						/>
					</td>
					<td v-if="user.uid">
						<input
							class="form-control"
							type="text"
							v-model="publicador.comentario"
							@input="
								onChange(publicador.id, { comentario: publicador.comentario })
							"
						/>
					</td>
				</tr>
			</tbody>
			<tfoot class="table-primary">
				<tr v-if="user.uid">
					<th>Total</th>
					<td></td>
					<td>
						<b>{{ estudiosPublicadores }}</b>
					</td>
					<td></td>
				</tr>
			</tfoot>
		</table>

		<div class="list-group-item"><b>Precursores Auxiliares</b></div>
		<div class="list-group-item"><b>Precursores Regulares</b></div>
		<div class="list-group-item"><b>Precursores Especiales</b></div>

		<!-- agregar Publicador -->
		<div v-if="user.uid" class="container d-flex justify-content-center">
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
							required
							type="text"
							class="form-control"
							id="nombre"
							v-model="nuevoPublicador.nombre"
						/>
					</div>
					<div class="ms-3">
						<label for="bautizado">Bautizado</label>
						<input
							type="checkbox"
							class="form-check-input ms-1"
							id="bautizado"
							v-model="nuevoPublicador.bautizado"
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
										v-model="nuevoPublicador.auxiliar"
									/>
								</div>
								<div>
									<label for="regular">Regular</label>
									<input
										class="ms-2"
										type="radio"
										id="regular"
										name="precursor"
										v-model="nuevoPublicador.regular"
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
									v-model="nuevoPublicador.ministerial"
								/>
							</div>
							<div>
								<label for="anciano">Anciano</label>
								<input
									class="form-check-input ms-1"
									type="checkbox"
									id="anciano"
									v-model="nuevoPublicador.anciano"
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
