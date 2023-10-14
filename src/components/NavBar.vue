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
</script>
<template>
	<nav class="navbar shadow bg-blur container-fluid nav-layout fixed-top">
		<img class="logoVR" src="@/assets/img/favicon.png" />
		<a
			v-if="user.displayName == undefined"
			href="/"
			style="text-decoration: none; color: black"
		>
			<h1>Villa Rocío</h1>
		</a>
		<!-- <a v-if="user.displayName == undefined" href="/">Welcome</a> -->
		<span v-else href="/"> {{ user.displayName }}</span>
		<div class="d-flex gap-2" v-if="user.displayName == undefined">
			<button
				type="button"
				class="btn btn-sm btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
				data-bs-whatever="@mdo"
			>
				Entrar
			</button>
			<button
				type="button"
				class="btn btn-sm btn-secondary"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal1"
				data-bs-whatever="@mdo"
			>
				Registrar
			</button>
		</div>
		<button
			v-else
			@click="EndSession()"
			type="button"
			class="btn btn-secondary btn-sm"
		>
			Salir
		</button>
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
					<h1 class="modal-title fs-5" id="exampleModalLabel">Login</h1>
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
					<form>
						<div class="mb-3">
							<label for="recipient-name" class="col-form-label">
								Usuario
							</label>
							<input type="email" v-model="email" class="form-control" />
						</div>
						<div class="mb-3">
							<label for="message-text" class="col-form-label">
								Contraseña
							</label>
							<input type="password" v-model="password" class="form-control" />
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-primary"
						@click="SignInEmail()"
						data-bs-dismiss="modal"
					>
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
					<h1 class="modal-title fs-5" id="exampleModalLabel">Registrarse</h1>
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
					<form>
						<div class="mb-3">
							<label for="recipient-name" class="col-form-label">
								Usuario
							</label>
							<input type="email" v-model="email" class="form-control" />
						</div>
						<div class="mb-3">
							<label for="message-text" class="col-form-label">
								Contraseña
							</label>
							<input type="password" v-model="password" class="form-control" />
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button
						type="button"
						class="btn btn-primary"
						@click="SignUpEmail()"
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
<style>
.logoVR {
	margin: 0;
	padding: 0;
	height: 2.5rem;
}

h1 {
	margin: 0;
	padding: 0;
	font-size: 2rem;
}
.bg-blur {
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
