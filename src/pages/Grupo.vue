<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const { params } = useRoute()

const nuevoPublicador = ref({
	nombre: '',
	bautizado: false,
	anciano: false,
	auxiliar: false,
	regular: false,
	horas: 0,
	comentario: '',
	estudios: 0,
	grupo: Number(params.numero),
	informe: false,
	ministerial: false,
})

onMounted(() => {})
</script>
<template>
	<div class="container">
		<form>
			<div class="d-flex flex-column">
				<h2>Grupo {{ params.numero }}</h2>
				<div>
					<label for="nombre">Nombre: </label>
					<input type="text" id="nombre" :model="nuevoPublicador.nombre" />
				</div>

				<div>
					<label for="bautizado">Bautizado</label>
					<input
						type="checkbox"
						id="bautizado"
						:model="nuevoPublicador.bautizado"
					/>
				</div>
				<div>
					<label for="auxiliar">Precursor Auxiliar</label>
					<input
						type="checkbox"
						id="auxiliar"
						:model="nuevoPublicador.auxiliar"
					/>
				</div>
				<div>
					<label for="auxiliar">Precursor regular</label>
					<input
						type="checkbox"
						id="regular"
						:model="nuevoPublicador.regular"
					/>
				</div>
				<div>
					<label for="ministerial">Ministerial</label>
					<input
						type="checkbox"
						id="ministerial"
						:model="nuevoPublicador.ministerial"
					/>
				</div>
				<div>
					<label for="anciano">Anciano</label>
					<input
						type="checkbox"
						id="anciano"
						:model="nuevoPublicador.anciano"
					/>
				</div>
			</div>
			<button type="submit">Agregar</button>
		</form>
	</div>
</template>

<style scoped></style>
