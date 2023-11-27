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

const estudiosPublicadores = ref(0) //ok

const horasPrecursoresA = ref(0)
const estudiosPrecursoresA = ref(0)
const horasPrecursoresR = ref(0)
const estudiosPrecursoresR = ref(0)

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

async function buscarPublicadoresPorGrupo(numeroGrupo) {
	// console.log('Grupo: ' + Number(numeroGrupo))
	await buscarDocumentos('publicadores', ['grupo', '==', Number(numeroGrupo)])
		.then((res) => {
			const pubA = []
			const pubR = []
			const pubN = []
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
			const ordenar = (arr) => {
				arr.sort((a, b) => {
					// console.log(a, b)
					if (a.nombre > b.nombre) {
						return 1
					} else if (a.nombre < b.nombre) {
						return -1
					} else {
						return 0
					}
				})
			}
			// ordenamos
			ordenar(pubA)
			ordenar(pubR)
			ordenar(pubN)
			publicadores.value = pubN
			precursoresA.value = pubA
			precursoresR.value = pubR
			sumarTotales()
		})
		.catch((err) => {
			console.error(err)
		})
}

async function agregarPublicador() {
	await guardarActualizarDocumento('publicadores', nuevoPublicador.value)
		.then(() => {
			publicadores.value = []
			precursoresA.value = []
			precursoresR.value = []
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
	await actualizarDocumento('publicadores', id, data)
		.then(() => {
			sumarTotales()
		})
		.catch((err) => {
			console.error(err)
		})
}

function sumarTotales() {
	// publicadores
	let estudiosP = 0
	// auxiliares
	let horasPA = 0
	let estudiosPA = 0
	// regulares
	let horasPR = 0
	let estudiosPR = 0

	// suma Publicadores
	for (let i in publicadores.value) {
		const estudios = publicadores.value[i].estudios
		estudiosP += Number(estudios)
		estudiosPublicadores.value = estudiosP
	}

	// suma Auxiliares
	for (let i in precursoresA.value) {
		const horas = precursoresA.value[i].horas
		const estudios = precursoresA.value[i].estudios

		horasPA += Number(horas)
		estudiosPA += Number(estudios)

		horasPrecursoresA.value = horasPA
		estudiosPrecursoresA.value = estudiosPA
	}
	// suma regulares
	for (let i in precursoresR.value) {
		const horas = precursoresR.value[i].horas
		const estudios = precursoresR.value[i].estudios

		horasPR += Number(horas)
		estudiosPR += Number(estudios)

		horasPrecursoresR.value = horasPR
		estudiosPrecursoresR.value = estudiosPR
	}

	// console.log(horasPrecursoresR.value, estudiosPrecursoresR.value)
}

async function actualizarPrecursor(id, data) {
	await onChange(id, data)
		.then(() => {
			publicadores.value = []
			precursoresA.value = []
			precursoresR.value = []
			buscarPublicadoresPorGrupo(params.numero)
		})
		.catch((err) => {
			console.error(err)
		})
}

function editarCampos() {
	if (editar.value) {
		editar.value = false
	} else {
		editar.value = true
	}
}

async function borrarpublicador(id) {
	await eliminarDocumento('publicadores', id)
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
	<div class="pt-3 container listados-grupos">
		<h3>Grupo Número {{ params.numero }}</h3>
		<Loading v-if="publicadores.length == 0"></Loading>
		<div v-else>
			<!--publicadores -->
			<table
				class="table table-responsive table-sm mt-3 table-bordered table-hover"
			>
				<thead class="table-primary">
					<tr>
						<th scope="col">
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
										class="btn btn-primary p-1"
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
						<th v-if="user.uid" scope="col" class="text-center">Nota</th>
						<th v-if="user.uid" scope="col" class="text-center">Mover</th>
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
								<div>Auxiliares</div>
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
										class="btn btn-primary p-1"
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
						<th v-if="user.uid" scope="col">Nota</th>
						<th v-if="user.uid" scope="col">Mover</th>
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
							<b>{{ horasPrecursoresA }}</b>
						</td>
						<td class="text-center">
							<b>{{ estudiosPrecursoresA }}</b>
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
								<div>Regulares</div>
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
										class="btn btn-primary p-1"
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
						<th v-if="user.uid" scope="col">Nota</th>
						<th v-if="user.uid" scope="col">Mover</th>
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
							<b>{{ horasPrecursoresR }}</b>
						</td>
						<td class="text-center">
							<b>{{ estudiosPrecursoresR }}</b>
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
input[type='number']::-webkit-inner-spin-button {
	-webkit-appearance: none;
}

input[type='number'] {
	min-width: 100%;
}

input {
	background-color: transparent;
}

input[type='checkbox'] {
	cursor: pointer;
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
