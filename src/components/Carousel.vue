<script setup></script>
<template>
	<div>
		<div id="carouselExampleDark" class="carousel carousel-dark slide mb-3">
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
					<a
						href="https://drive.google.com/file/d/1n2xWHLw55sZ3drwQlXq14vzU2KWvdlX1yg/view"
						target="_blank"
						rel="noopener noreferrer"
					>
						<img
							src="/public/img/TargetasTerritorio(Obtimizado).jpg"
							class="d-block w-100"
							alt="..."
						/>
						<div class="carousel-caption d-none d-md-block">
							<h3>Territorio Pincipal</h3>
							<p>Mira y descarga el mapa del territorio de la congregación</p>
						</div>
					</a>
				</div>
				<div class="carousel-item img-carucel" data-bs-interval="2000">
					<iframe
						src="https://www.google.com/maps/d/u/0/embed?mid=1I6hkYNO73qSDyqLG1DlUXahzLPT11Tg&ehbc=2E312F"
						width="1920"
						height="600"
						style="border: 0"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
					<div class="carousel-caption d-none d-md-block">
						<h3 style="color: white">Santa Isabel, Sena,</h3>
						<p style="color: white">Territorio aislado asignado</p>
					</div>
				</div>
				<div class="carousel-item img-carucel" data-bs-interval="2000">
					<iframe
						src="https://www.google.com/maps/d/embed?mid=1TQJN9o3nfdCAHwxYx5ZhDs39tiv9ODw&ehbc=2E312F"
						width="1920"
						height="600"
						style="border: 0"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
					></iframe>
					<div class="carousel-caption d-none d-md-block">
						<h3 style="color: white">Sieneguita</h3>
						<p style="color: white">Territorio aislado</p>
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
