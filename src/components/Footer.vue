<template>
	<footer class="bd-footer py-4 py-md-1 mt-5 bg-body-tertiary">
		<div class="container py-4 py-md-5 px-4 px-md-3 text-body-secondary">
			<div class="d-flex justify-content-between">
				<div class="">
					<span class="fs-5">
						<RouterLink to="/">
							<h4>Villa Rocío</h4>
						</RouterLink>
					</span>
					<ul class="list-unstyled small">
						<li class="mb-2 parrafo-futher">
							En este sitio web, podrá: <br />
							Visualizar y descargar el mapa del territorio general. Ver una
							lista de grupos. Revisar agendas personales de conferencias. Ver
							acuerdos de conferencias con otras congregaciones.
						</li>
					</ul>
				</div>
				<div>
					<h5>Índice</h5>
					<ul class="list-unstyled">
						<li class="mb-2">
							<RouterLink to="/">Inicio</RouterLink>
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
						<li>
							<RouterLink to="/agenda/ministeriales">Ministeriales</RouterLink>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</template>
<script setup></script>
<style scoped>
a {
	text-decoration: none;
	color: rgb(59, 59, 59);
}

.parrafo-futher {
	max-width: 80%;
}
</style>
