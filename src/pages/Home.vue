<script setup>
import Carousel from '@/components/Carousel.vue'

function imprimir() {
	print()
}
</script>
<template>
	<Carousel />
	<div>
		<div class="container">
			<h2 class="pt-4 pb-3 mb-3 border-bottom fs-1">Información general</h2>
			<div class="fw-medium fs-5">En este sitio web, podrá:</div>
			<ul class="pb-4 me-5 fw-medium fs-5">
				<li>
					Visualizar y
					<a
						href="https://drive.google.com/u/0/uc?id=1n2xWHLw55sZ3drwQlXq14vzU2KWvdlX1yg&export=download"
						target="_blank"
						rel="noopener noreferrer"
					>
						descargar el mapa </a
					>del territorio general.
				</li>
				<li>
					Visualizar el
					<a
						href="https://docs.google.com/spreadsheets/d/1RlSSHVHKMvuBQzJ_xdrTpC4aTWLO7Ex2i3jPlC9uEJM/edit?usp=sharing"
						target="_blank"
						rel="noopener noreferrer"
					>
						regitro de rerritorios.
					</a>
				</li>
				<li>Ver una lista de <RouterLink to="/grupos">grupos.</RouterLink></li>
				<li>
					Revisar <RouterLink to="/agenda/">agendas</RouterLink> personales de
					conferencias.
				</li>
				<li>
					Ver acuerdos de
					<router-link to="/agenda/#calendario">conferencias </router-link>
					con otras congregaciones.
				</li>
			</ul>
		</div>
	</div>
</template>
<style scoped>
.img-carucel {
	max-height: 30rem;
	color: black;
}

.img-carucel img {
	max-height: 30rem;
	object-fit: contain;
}

.img-carucel P,
h5 {
	color: black;
}

.img-carucel img {
	filter: opacity(0.7);
}
</style>
