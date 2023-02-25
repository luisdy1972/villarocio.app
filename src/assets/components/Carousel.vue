<script setup></script>
<template>
	<div>
		<div id="carouselExampleDark" class="carousel carousel-dark slide">
			<div class="carousel-indicators">
				<button
					type="button"
					data-bs-target="#carouselExampleDark"
					data-bs-slide-to="0"
					class="active"
					aria-current="true"
					aria-label="Slide 1"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleDark"
					data-bs-slide-to="1"
					aria-label="Slide 2"
				></button>
				<button
					type="button"
					data-bs-target="#carouselExampleDark"
					data-bs-slide-to="2"
					aria-label="Slide 3"
				></button>
			</div>
			<div class="carousel-inner">
				<div class="carousel-item img-carucel active" data-bs-interval="10000">
					<img
						src="../../../public/img/TargetasTerritorio(Obtimizado).jpg"
						class="d-block w-100"
						alt="..."
					/>
					<div class="carousel-caption d-none d-md-block">
						<h5>Territorio</h5>
						<p>Ve y descarga el mapa del territorio de la congregación</p>
					</div>
				</div>
				<div class="carousel-item img-carucel" data-bs-interval="2000">
					<img
						src="../../../public/img/TargetasTerritorio(Obtimizado).jpg"
						class="d-block w-100"
						alt="..."
					/>
					<div class="carousel-caption d-none d-md-block">
						<h5>Second slide label</h5>
						<p>Some representative placeholder content for the second slide.</p>
					</div>
				</div>
				<div class="carousel-item img-carucel">
					<img
						src="../../../public/img/TargetasTerritorio(Obtimizado).jpg"
						class="d-block w-100"
						alt="..."
					/>
					<div class="carousel-caption d-none d-md-block">
						<h5>Third slide label</h5>
						<p>Some representative placeholder content for the third slide.</p>
					</div>
				</div>
			</div>
			<button
				class="carousel-control-prev"
				type="button"
				data-bs-target="#carouselExampleDark"
				data-bs-slide="prev"
			>
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button
				class="carousel-control-next"
				type="button"
				data-bs-target="#carouselExampleDark"
				data-bs-slide="next"
			>
				<span class="carousel-control-next-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Next</span>
			</button>
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
