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

import { Loading, Notification } from '@components'

const nuevoAnciano = ref({ nombre: '', linkAgenda: '' })
const ancianos = ref([
	{
		nombre: '',
		linkAgenda: '',
	},
])
const notification = ref(false)

async function guardarNuevoAnciano() {
	console.log(nuevoAnciano.value)
	try {
		const ancianoRef = await addDoc(
			collection(db, 'ancianos'),
			nuevoAnciano.value
		)
		await setDoc(ancianoRef, nuevoAnciano.value)
		ancianos.value = [
			{
				nombre: '',
				linkAgenda: undefined,
			},
		]
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
	notification.value = true
	setTimeout(() => {
		notification.value = false
	}, 7000)
	// console.log(texto)
}
</script>
<template>
	<ul id="ancianos" class="list-group list-group-flush">
		<div class="list-group-item">
			<!-- notificacion copiado -->
			<div v-if="notification">
				<Notification
					titulo="Enlace copiado"
					mensaje="El enlace fue copiado en su portapapeles, ya puede pegarlo y compatirlo."
				/>
			</div>
			<div
				v-for="anciano in ancianos"
				class="list-group-item list-group-item-action d-flex justify-content-between m-1"
			>
				<a
					:href="anciano.linkAgenda"
					target="_blank"
					class="text-decoration-none text-primary fs-5 fw-bold flex-fill"
				>
					<div v-if="ancianos.length == 1">
						<Loading />
					</div>
					{{ anciano.nombre }}
				</a>
				<!-- copiar enlace -->
				<button
					@click="copiarTexto(anciano.linkAgenda)"
					type="button"
					class="btn btn-outline-primary"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-link-45deg"
						viewBox="0 0 16 16"
					>
						<path
							d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"
						/>
						<path
							d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"
						/>
					</svg>
				</button>

				<!-- eliminar -->
				<button
					v-if="user.displayName"
					v-on:click="copiarTexto(anciano.linkAgenda)"
					type="button"
					class="btn btn-outline-danger ms-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-trash"
						viewBox="0 0 16 16"
					>
						<path
							d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"
						/>
						<path
							d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"
						/>
					</svg>
				</button>
				<!-- editar -->
				<button
					v-if="user.displayName"
					v-on:click="copiarTexto(anciano.linkAgenda)"
					type="button"
					class="btn btn-outline-secondary ms-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-pencil-square"
						viewBox="0 0 16 16"
					>
						<path
							d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
						/>
						<path
							fill-rule="evenodd"
							d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
						/>
					</svg>
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						class="bi bi-person-plus"
						viewBox="0 0 16 16"
					>
						<path
							d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
						/>
						<path
							fill-rule="evenodd"
							d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
						/>
					</svg>
					Agregar Nuevo Anciano
				</button>
			</div>
		</div>
	</ul>

	<!-- modal nuevo anciano -->
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
