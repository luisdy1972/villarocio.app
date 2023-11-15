<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
	user,
	buscarDocumentos,
	guardarActualizarDocumento,
	actualizarDocumento,
	eliminarDocumento,
} from '@db'

import { Loading } from '@components'
const { params } = useRoute()
const publicadores = ref([])
const precursoresA = ref([])
const precursoresR = ref([])

const editar = ref(true)

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
			let pubA = []
			let pubR = []
			let pubN = []
			for (let pub of res) {
				if (pub.auxiliar) {
					pubA.push(pub)
				}
				if (pub.regular) {
					pubR.push(pub)
				}
				if (!pub.auxiliar && !pub.regular) {
					pubN.push(pub)
				}
			}
			publicadores.value = pubN
			precursoresA.value = pubA
			precursoresR.value = pubR
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

async function onChange(id, data) {
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

function actualizarPrecursor(id, data) {
	onChange(id, data)
		.then((result) => {
			publicadores.value = []
			precursoresA.value = []
			precursoresR.value = []
			buscarPublicadoresPorGrupo(params.numero)
		})
		.catch((err) => {})
}

function editarCampos() {
	if (editar.value) {
		editar.value = false
	} else {
		editar.value = true
	}
}

function borrarpublicador(id) {
	eliminarDocumento('publicadores', id)
		.then((result) => {
			publicadores.value = []
			precursoresA.value = []
			precursoresR.value = []
			buscarPublicadoresPorGrupo(params.numero)
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
	<div class="container pt-3">
		<h3 class="active">Grupo Número {{ params.numero }}</h3>
		<Loading v-if="publicadores.length == 0"></Loading>
		<div v-else>
			<!--publicadores -->
			<table
				class="table table-responsive table-sm mt-3 table-bordered table-hover"
			>
				<thead class="table-primary">
					<tr>
						<th scope="col ">
							<div class="d-flex gap-1">
								<div>Publicadores</div>
								<div v-if="user.uid">
									<button
										v-if="editar"
										@click="editarCampos()"
										class="btn btn-secondary p-1"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="bi bi-pencil"
											viewBox="0 0 16 16"
										>
											<path
												d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
											/>
										</svg>
									</button>
									<button
										v-else
										@click="editarCampos()"
										class="btn btn-primary ms-4 p-1"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="bi bi-floppy"
											viewBox="0 0 16 16"
										>
											<path d="M11 2H9v3h2V2Z" />
											<path
												d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0ZM1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5Zm3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4v4.5ZM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V15Z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</th>
						<th v-if="user.uid" scope="col">
							<div class="text-center">Informe</div>
						</th>
						<th v-if="user.uid" scope="col">
							<div class="text-center">Estudios</div>
						</th>
						<th v-if="user.uid" scope="col">Comentario</th>
						<th v-if="user.uid" scope="col">Opciones</th>
					</tr>
				</thead>
				<tbody>
					<tr scope="row" v-for="publicador in publicadores">
						<td class="table-nombre">
							<input
								:readonly="editar"
								type="text"
								class="form-control border-none"
								v-model="publicador.nombre"
								@change="onChange(publicador.id, { nombre: publicador.nombre })"
							/>
						</td>
						<td v-if="user.uid" class="d-flex justify-content-center">
							<input
								class="form-check-input predico"
								type="checkbox"
								v-model="publicador.informe"
								@change="
									onChange(publicador.id, { informe: publicador.informe })
								"
							/>
						</td>
						<td class="input-estudios" v-if="user.uid">
							<div class="d-flex justify-content-center">
								<input
									type="number"
									v-model="publicador.estudios"
									@input="
										onChange(publicador.id, { estudios: publicador.estudios })
									"
									class="form-control border-none text-center input-estudios"
								/>
							</div>
						</td>
						<td v-if="user.uid">
							<input
								class="form-control border-none"
								type="text"
								v-model="publicador.comentario"
								@input="
									onChange(publicador.id, { comentario: publicador.comentario })
								"
							/>
						</td>
						<td v-if="user.uid">
							<div class="d-flex gap-1 justify-content-center">
								<button
									class="btn btn-secondary p-1"
									@click="
										actualizarPrecursor(publicador.id, {
											auxiliar: true,
											regular: false,
										})
									"
									type="button"
								>
									A
								</button>
								<button
									class="btn btn-primary p-1"
									@click="
										actualizarPrecursor(publicador.id, {
											auxiliar: false,
											regular: true,
										})
									"
									type="button"
								>
									R
								</button>
								<!-- <button
									class="btn btn-danger p-1"
									@click="borrarpublicador(publicador.id)"
									type="button"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-trash3"
										viewBox="0 0 16 16"
									>
										<path
											d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
										/>
									</svg>
								</button> -->
							</div>
						</td>
					</tr>
				</tbody>
				<tfoot class="table-primary">
					<tr v-if="user.uid">
						<th>Total</th>
						<td></td>
						<td class="text-center">
							<b>{{ estudiosPublicadores }}</b>
						</td>
						<td></td>
						<td></td>
					</tr>
				</tfoot>
			</table>
			<!--Auxiliares -->
			<table
				class="table table-responsive table-sm mt-3 table-bordered table-hover"
			>
				<thead class="table-primary">
					<tr>
						<th scope="col ">
							<div class="d-flex gap-1">
								<div>P. Auxiliares</div>
								<div v-if="user.uid">
									<button
										v-if="editar"
										@click="editarCampos()"
										class="btn btn-secondary p-1"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="bi bi-pencil"
											viewBox="0 0 16 16"
										>
											<path
												d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
											/>
										</svg>
									</button>
									<button
										v-else
										@click="editarCampos()"
										class="btn btn-primary ms-4 p-1"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="bi bi-floppy"
											viewBox="0 0 16 16"
										>
											<path d="M11 2H9v3h2V2Z" />
											<path
												d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0ZM1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5Zm3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4v4.5ZM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V15Z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</th>
						<th v-if="user.uid" scope="col">
							<div class="text-center">Informe</div>
						</th>
						<th v-if="user.uid" scope="col">
							<div class="text-center">Horas</div>
						</th>
						<th v-if="user.uid" scope="col">
							<div class="text-center">Estudios</div>
						</th>
						<th v-if="user.uid" scope="col">Comentario</th>
						<th v-if="user.uid" scope="col">Opciones</th>
					</tr>
				</thead>
				<tbody>
					<tr scope="row" v-for="publicador in precursoresA">
						<td class="table-nombre">
							<input
								:readonly="editar"
								type="text"
								class="form-control border-none"
								v-model="publicador.nombre"
								@change="onChange(publicador.id, { nombre: publicador.nombre })"
							/>
						</td>
						<td v-if="user.uid" class="d-flex justify-content-center">
							<input
								class="form-check-input predico"
								type="checkbox"
								v-model="publicador.informe"
								@change="
									onChange(publicador.id, { informe: publicador.informe })
								"
							/>
						</td>
						<td class="input-estudios" v-if="user.uid">
							<div class="d-flex justify-content-center">
								<input
									type="number"
									v-model="publicador.horas"
									@input="onChange(publicador.id, { horas: publicador.horas })"
									class="form-control border-none text-center input-estudios"
								/>
							</div>
						</td>
						<td class="input-estudios" v-if="user.uid">
							<div class="d-flex justify-content-center">
								<input
									type="number"
									v-model="publicador.estudios"
									@input="
										onChange(publicador.id, { estudios: publicador.estudios })
									"
									class="form-control border-none text-center input-estudios"
								/>
							</div>
						</td>
						<td v-if="user.uid">
							<input
								class="form-control border-none"
								type="text"
								v-model="publicador.comentario"
								@input="
									onChange(publicador.id, { comentario: publicador.comentario })
								"
							/>
						</td>
						<td v-if="user.uid">
							<div class="d-flex gap-1 justify-content-center">
								<button
									class="btn btn-secondary p-1"
									@click="
										actualizarPrecursor(publicador.id, {
											auxiliar: false,
											regular: false,
										})
									"
									type="button"
								>
									P
								</button>
								<button
									class="btn btn-primary p-1"
									@click="
										actualizarPrecursor(publicador.id, {
											auxiliar: false,
											regular: true,
										})
									"
									type="button"
								>
									R
								</button>
								<!-- <button
									class="btn btn-danger p-1"
									@click="borrarpublicador(publicador.id)"
									type="button"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-trash3"
										viewBox="0 0 16 16"
									>
										<path
											d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
										/>
									</svg>
								</button> -->
							</div>
						</td>
					</tr>
				</tbody>
				<tfoot class="table-primary">
					<tr v-if="user.uid">
						<th>Total</th>
						<td></td>
						<td class="text-center">
							<b>Total</b>
						</td>
						<td class="text-center">
							<b>Total</b>
						</td>
						<td></td>
						<td></td>
					</tr>
				</tfoot>
			</table>
			<!--Regulares -->
			<table
				class="table table-responsive table-sm mt-3 table-bordered table-hover"
			>
				<thead class="table-primary">
					<tr>
						<th scope="col ">
							<div class="d-flex gap-1">
								<div>P. Regulares</div>
								<div v-if="user.uid">
									<button
										v-if="editar"
										@click="editarCampos()"
										class="btn btn-secondary p-1"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="bi bi-pencil"
											viewBox="0 0 16 16"
										>
											<path
												d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
											/>
										</svg>
									</button>
									<button
										v-else
										@click="editarCampos()"
										class="btn btn-primary ms-4 p-1"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="bi bi-floppy"
											viewBox="0 0 16 16"
										>
											<path d="M11 2H9v3h2V2Z" />
											<path
												d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0ZM1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5Zm3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4v4.5ZM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5V15Z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</th>
						<th v-if="user.uid" scope="col">
							<div class="text-center">Informe</div>
						</th>
						<th v-if="user.uid" scope="col">
							<div class="text-center">Horas</div>
						</th>
						<th v-if="user.uid" scope="col">
							<div class="text-center">Estudios</div>
						</th>
						<th v-if="user.uid" scope="col">Comentario</th>
						<th v-if="user.uid" scope="col">Opciones</th>
					</tr>
				</thead>
				<tbody>
					<tr scope="row" v-for="publicador in precursoresR">
						<td class="table-nombre">
							<input
								:readonly="editar"
								type="text"
								class="form-control border-none"
								v-model="publicador.nombre"
								@change="onChange(publicador.id, { nombre: publicador.nombre })"
							/>
						</td>
						<td v-if="user.uid" class="d-flex justify-content-center">
							<input
								class="form-check-input predico"
								type="checkbox"
								v-model="publicador.informe"
								@change="
									onChange(publicador.id, { informe: publicador.informe })
								"
							/>
						</td>
						<td class="input-estudios" v-if="user.uid">
							<div class="d-flex justify-content-center">
								<input
									type="number"
									v-model="publicador.horas"
									@input="onChange(publicador.id, { horas: publicador.horas })"
									class="form-control border-none text-center input-estudios"
								/>
							</div>
						</td>
						<td class="input-estudios" v-if="user.uid">
							<div class="d-flex justify-content-center">
								<input
									type="number"
									v-model="publicador.estudios"
									@input="
										onChange(publicador.id, { estudios: publicador.estudios })
									"
									class="form-control border-none text-center input-estudios"
								/>
							</div>
						</td>
						<td v-if="user.uid">
							<input
								class="form-control border-none"
								type="text"
								v-model="publicador.comentario"
								@input="
									onChange(publicador.id, { comentario: publicador.comentario })
								"
							/>
						</td>
						<td v-if="user.uid">
							<div class="d-flex gap-1 justify-content-center">
								<button
									class="btn btn-secondary p-1"
									@click="
										actualizarPrecursor(publicador.id, {
											auxiliar: false,
											regular: false,
										})
									"
									type="button"
								>
									P
								</button>
								<!-- <button
									class="btn btn-danger p-1"
									@click="borrarpublicador(publicador.id)"
									type="button"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-trash3"
										viewBox="0 0 16 16"
									>
										<path
											d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"
										/>
									</svg>
								</button> -->
							</div>
						</td>
					</tr>
				</tbody>
				<tfoot class="table-primary">
					<tr v-if="user.uid">
						<th>Total</th>
						<td></td>
						<td class="text-center">
							<b>Total</b>
						</td>
						<td class="text-center">
							<b>Total</b>
						</td>
						<td></td>
						<td></td>
					</tr>
				</tfoot>
			</table>
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
	</div>
</template>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
input {
	background-color: transparent;
}

input:focus {
	background-color: transparent;
}

.border-none {
	border: none;
}
.table-nombre {
	min-width: 9rem;
}
.input-estudios {
	max-width: 4rem;
}
.predico {
	min-height: 2rem;
	min-width: 2rem;
}
#nuevo-publicador {
	min-width: 40%;
}
</style>
