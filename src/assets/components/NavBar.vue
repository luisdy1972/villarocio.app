<script setup></script>

<template>
	<div>
		<nav class="navbar bg-body-tertiary fixed-top shadow">
			<div class="container-fluid">
				<img class="logoVR" src="../../../public/img/favicon.png" />
				<a class="titulo-principal" href="#">
					<h1>Villa Rocío</h1>
				</a>

				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasNavbar"
					aria-controls="offcanvasNavbar"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div
					class="offcanvas offcanvas-end"
					tabindex="-1"
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
				>
					<div class="offcanvas-header">
						<h5 class="offcanvas-title" id="offcanvasNavbarLabel">
							Configuraciones
						</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						></button>
					</div>
					<div class="offcanvas-body">
						<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
							<li class="nav-item">
								<a class="nav-link active" aria-current="page" href="#"
									>Añadir Grupo</a
								>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#">Añadir 🤵🏻</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>

<style scoped>
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

.titulo-principal {
	margin: 0;
	color: black;
	text-decoration: none;
}
</style>
