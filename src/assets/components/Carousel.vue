<script setup></script>
<template>
	<div>
		<div id="carouselExampleDark" class="carousel carousel-dark slide mb-3">
			<div class="carousel-indicators">
				<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active"
					aria-current="true" aria-label="Slide 1"></button>
				<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
					aria-label="Slide 2"></button>
				<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
					aria-label="Slide 3"></button>
			</div>
			<div class="carousel-inner">
				<div class="carousel-item img-carucel active" data-bs-interval="10000">
					<img src="../../../public/img/TargetasTerritorio(Obtimizado).jpg" class="d-block w-100" alt="..." />
					<div class="carousel-caption d-none d-md-block">
						<h3>Territorio Pincipal</h3>
						<p>Mira y descarga el mapa del territorio de la congregación</p>
					</div>
				</div>
				<div class="carousel-item img-carucel" data-bs-interval="2000">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6743.851152877569!2d-75.95463548413818!3d8.545832562318854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a470f0d34de53%3A0xc7f64c51b5b96d1b!2zU2FudGEgSXNhYmVsLCBNb250ZXLDrWEsIEPDs3Jkb2Jh!5e1!3m2!1ses-419!2sco!4v1677384855480!5m2!1ses-419!2sco"
						width="1920" height="600" style="border: 0" allowfullscreen="" loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"></iframe>
					<div class="carousel-caption d-none d-md-block">
						<h3 style="color: white">Santa Isabel, Sena,</h3>
						<p style="color: white">Territorio aislado asignado</p>
					</div>
				</div>
				<div class="carousel-item img-carucel " data-bs-interval="2000">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2385.746535550823!2d-75.73649046122291!3d8.637083099645317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses-419!2sco!4v1689277458933!5m2!1ses-419!2sco"
						width="1920" height="600" style="border:0;" allowfullscreen="" loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"></iframe>
					<div class="carousel-caption d-none d-md-block">
						<h3 style="color: white">Sieneguita</h3>
						<p style="color: white">Territorio aislado</p>
					</div>
				</div>
			</div>
			<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
				<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				<span class="visually-hidden">Previous</span>
			</button>
			<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
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
