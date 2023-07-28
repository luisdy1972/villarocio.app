<script setup></script>

<template>
	<div>
		<nav class="navbar bg-body-tertiary fixed-top shadow">
			<div class="container-fluid">
				<img class="logoVR" src="@/assets/img/favicon.png" />
				<a href="/" style="text-decoration: none; color: black">
					<h1>Villa Rocío</h1>
				</a>
				<button
					class="navbar-toggler boton-navegacion"
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
						<h5 class="offcanvas-title" id="offcanvasNavbarLabel">Páginas</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="offcanvas"
							aria-label="Close"
						></button>
					</div>
					<div class="offcanvas-body">
						<ul class="navbar-nav justify-content-end flex-grow-1 pe-3 fs-5">
							<a href="/" class="text-decoration-none text-primary">
								<li class="nav-item">Página Principal</li>
							</a>
							<a href="/grupos" class="text-decoration-none text-primary">
								<li class="nav-item">Grupos</li>
							</a>
							<a href="/agenda" class="text-decoration-none text-primary">
								<li class="nav-item">Agendas de conferencias</li>
							</a>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	</div>
	<div style="margin-top: 4rem">
		<RouterView></RouterView>
	</div>
	<footer class="bd-footer py-4 py-md-5 mt-5 bg-body-tertiary">
		<div class="container py-4 py-md-5 px-4 px-md-3 text-body-secondary">
			<div class="d-flex justify-content-between">
				<div class="">
					<a
						class="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none"
						href="/"
						aria-label="Bootstrap"
					>
						<span class="fs-5">Villa Rocío</span>
					</a>
					<ul class="list-unstyled small">
						<li class="mb-2 parrafo-futher">
							En este sitio web, podrá: <br />
							Visualizar y descargar el mapa del territorio general. Ver una
							lista de grupos. Revisar agendas personales de conferencias. Ver
							acuerdos de conferencias con otras congregaciones.
						</li>
					</ul>
				</div>
				<div class="">
					<h5>Índice</h5>
					<ul class="list-unstyled">
						<li class="mb-2">
							<a href="/">Pagina Principal</a>
						</li>
						<li class="mb-2">
							<RouterLink to="/grupos">Grupos</RouterLink>
						</li>
						<li class="mb-2">
							<RouterLink to="/agenda">Agendas</RouterLink>
						</li>
						<li class="mb-2">
							<RouterLink to="/agenda/ancianos">Ancianos</RouterLink>
						</li>
						<li class="mb-2">
							<RouterLink to="/agenda/ministeriales">Ministeriales</RouterLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
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
.boton-navegacion {
	color: #62bee8;
}
.parrafo-futher {
	max-width: 20%;
}
</style>
