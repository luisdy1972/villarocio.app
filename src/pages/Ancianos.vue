<script setup>
import { ref, onMounted } from 'vue'

import { user, db } from '@db'
import {
	collection,
	query,
	getDocs,
	addDoc,
	setDoc,
	deleteDoc,
} from 'firebase/firestore'

const ancianos = ref([{ nombre: 'Cargando...', linkAgenda: '#' }])
const nuevoAnciano = ref({ nombre: '', linkAgenda: '' })

async function guardarNuevoAnciano() {
	console.log(nuevoAnciano.value)
	try {
		const ancianoRef = await addDoc(
			collection(db, 'ancianos'),
			nuevoAnciano.value
		)
		await setDoc(ancianoRef, nuevoAnciano.value)
		ancianos.value = [{ nombre: 'Cargando...', linkAgenda: '#' }]
		nuevoAnciano.value.nombre = ''
		nuevoAnciano.value.linkAgenda = ''
		buscarAncianos()
	} catch (error) {
		console.error(error)
	}
}

async function buscarAncianos() {
	const ancianosDB = []
	let ancianoRef = collection(db, 'ancianos')
	const q = query(ancianoRef)
	// Ejecutar consulta
	let QuerySnapshot = await getDocs(q)
	QuerySnapshot.forEach((doc) => {
		const anciano = doc.data()
		ancianosDB.push(anciano)
		ancianos.value = ancianosDB
		// console.log(anciano)
	})
}

onMounted(() => {
	buscarAncianos()
})

function copiarTexto(texto) {
	navigator.clipboard.writeText(texto)
	// console.log(texto)
}
</script>
<template>
	<ul id="ancianos" class="list-group list-group-flush">
		<div class="list-group-item">
			<div
				v-for="anciano in ancianos"
				class="list-group-item list-group-item-action d-flex justify-content-between m-1"
			>
				<a
					:href="anciano.linkAgenda"
					target="_blank"
					class="text-decoration-none text-primary fs-5 fw-bold flex-fill"
				>
					{{ anciano.nombre }}
				</a>
				<button
					v-on:click="copiarTexto(anciano.linkAgenda)"
					type="button"
					class="btn btn-outline-primary"
				>
					copiar enlace
				</button>
				<button
					v-if="user.displayName"
					v-on:click="copiarTexto(anciano.linkAgenda)"
					type="button"
					class="btn btn-outline-danger ms-2"
				>
					Borrar
				</button>
			</div>
			<!-- nuevo Anciano -->
			<div
				v-if="user.displayName"
				class="list-group-item list-group-item-action d-flex justify-content-between m-1"
			>
				<button
					type="button"
					class="btn btn-outline-success"
					data-bs-toggle="modal"
					data-bs-target="#modal-nuevo-anciano"
					data-bs-whatever="@mdo"
				>
					Agregar Nuevo Anciano
				</button>
			</div>
		</div>
	</ul>

	<!-- modal -->
	<div
		v-if="user.displayName"
		class="modal fade"
		id="modal-nuevo-anciano"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title fs-5" id="exampleModalLabel">Nuevo Anciano</h2>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<form>
						<div class="mb-3">
							<label for="recipient-name" class="col-form-label">Nombre:</label>
							<input
								v-model="nuevoAnciano.nombre"
								type="text"
								class="form-control"
								id="recipient-name"
							/>
						</div>
						<div class="mb-3">
							<label for="message-text" class="col-form-label"
								>Enlace de la agenda:</label
							>
							<textarea
								v-model="nuevoAnciano.linkAgenda"
								placeholder="http://..."
								class="form-control"
								id="message-text"
							></textarea>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal"
					>
						Cerrar
					</button>
					<button
						v-if="nuevoAnciano.nombre != '' && nuevoAnciano.linkAgenda != ''"
						@click="guardarNuevoAnciano()"
						type="button"
						class="btn btn-primary"
						data-bs-dismiss="modal"
					>
						Guardar
					</button>
					<button v-else type="button" class="btn btn-primary" disabled>
						Guardar
					</button>
				</div>
			</div>
		</div>
	</div>
</template>
