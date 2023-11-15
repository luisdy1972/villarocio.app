<script setup>
import {
	user,
	email,
	password,
	LoginConGoogle,
	SignInEmail,
	SignUpEmail,
	EndSession,
} from '@db'
import { ref } from 'vue'
const password2 = ref('')

function registrar() {
	password2.value = ''
	SignUpEmail()
}
</script>

<template>
	<nav class="navbar shadow nav-bar-top-blur container-fluid fixed-top">
		<div class="d-flex align-items-center gap-2">
			<img class="logoVR ms-2" src="@/assets/img/favicon.png" />
			<RouterLink to="/" style="text-decoration: none; color: black">
				<h1>Villa Rocío</h1>
			</RouterLink>
			<!-- <a v-if="user.displayName == undefined" href="/">Welcome</a> -->
		</div>
		<div
			class="d-flex align-items-center gap-2 me-2"
			v-if="user.displayName == undefined"
		>
			<button
				type="button"
				class="btn btn-sm btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
				data-bs-whatever="@mdo"
			>
				Iniciar Sesión
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-person-circle"
					viewBox="0 0 16 16"
				>
					<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
					<path
						fill-rule="evenodd"
						d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
					/>
				</svg>
			</button>
		</div>
		<div v-else>
			<button
				type="button"
				class="btn btn-sm btn-secondary"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal1"
				data-bs-whatever="@mdo"
			>
				Registrar
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-person-lines-fill"
					viewBox="0 0 16 16"
				>
					<path
						d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"
					/>
				</svg>
			</button>
			<button
				@click="EndSession()"
				type="button"
				class="ms-1 me-1 btn btn-sm btn-danger"
			>
				Salir
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					class="bi bi-box-arrow-right"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
					/>
					<path
						fill-rule="evenodd"
						d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
					/>
				</svg>
			</button>
		</div>
	</nav>
	<!-- modal Iniciar Sesion -->
	<div
		class="modal fade"
		id="exampleModal"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title fs-5" id="exampleModalLabel">
						Iniciar Sesión
					</h2>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<button
						@click="LoginConGoogle()"
						class="btn btn-primary"
						role="button"
						data-bs-dismiss="modal"
					>
						Iniciar con Google
					</button>
					<form @submit.prevent="SignInEmail()">
						<div class="mb-3">
							<label for="email" class="col-form-label"> Usuario </label>
							<input
								id="email"
								type="email"
								pattern=".+@example\.com"
								size="30"
								required
								placeholder="Correo"
								v-model="email"
								class="form-control"
							/>
						</div>
						<div class="mb-3">
							<label for="pass" class="col-form-label"> Contraseña </label>
							<input
								id="pass"
								type="password"
								required
								placeholder="contraseña"
								v-model="password"
								class="form-control"
							/>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
						Entrar
					</button>
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal"
					>
						Cerrar
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- modal Registrarse  -->
	<div
		class="modal fade"
		id="exampleModal1"
		tabindex="-1"
		aria-labelledby="exampleModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h2 class="modal-title fs-5" id="exampleModalLabel">Registrarse</h2>
					<button
						type="button"
						class="btn-close"
						data-bs-dismiss="modal"
						aria-label="Close"
					></button>
				</div>
				<div class="modal-body">
					<!-- <button
						@click="LoginConGoogle()"
						class="btn btn-primary"
						role="button"
						data-bs-dismiss="modal"
					>
						Iniciar con Google
					</button> -->
					<form>
						<div class="mb-3">
							<label for="recipient-name" class="col-form-label">
								Usuario
							</label>
							<input
								placeholder="ejemplo@gmail.com"
								type="email"
								v-model="email"
								class="form-control"
							/>
						</div>
						<div class="mb-3">
							<label for="message-text" class="col-form-label">
								Contraseña
							</label>
							<input type="password" v-model="password" class="form-control" />
						</div>
						<div class="mb-3">
							<label for="message-text" class="col-form-label">
								Confirmar Contraseña
							</label>
							<input type="password" v-model="password2" class="form-control" />
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button
						v-if="user != '' && password != '' && password == password2"
						type="button"
						class="btn btn-primary"
						@click="registrar()"
						data-bs-dismiss="modal"
					>
						Registrar
					</button>
					<button
						v-else
						disabled
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal"
					>
						Registrar
					</button>
					<button
						type="button"
						class="btn btn-secondary"
						data-bs-dismiss="modal"
					>
						Cerrar
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.logoVR {
	height: 2.5rem;
}

h1 {
	font-size: 1.5rem;
}

.nav-bar-top-blur {
	background-color: rgba(255, 255, 255, 0.795);
	backdrop-filter: blur(1px);
}

nav {
	min-height: 3rem;
}
a {
	color: black;
	text-decoration: none;
}
a:hover {
	color: blue;
	text-decoration: dashed;
}
</style>
