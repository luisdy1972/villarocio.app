<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

function parametro() {
	const { params } = useRoute()
	return params
}

const nuevoPublicador = ref({
	nombre: '',
	bautizado: false,
	anciano: false,
	auxiliar: false,
	regular: false,
	horas: 0,
	comentario: '',
	estudios: 0,
	grupo: Number(parametro()),
	informe: false,
	ministerial: false,
})

onMounted(() => {})
</script>
<template>
	<div class="container">
		<form>
			<div class="d-flex flex-column">
				<h2>Grupo {{ parametro().numero }}</h2>

				__________________________________
				<p>Nuevo Publicador</p>
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
					<div>
						<label for="auxiliar">Publicador</label>
						<input type="radio" checked name="precursor" />
					</div>
					<div>
						<label for="auxiliar">Precursor Auxiliar</label>
						<input
							type="radio"
							name="precursor"
							id="auxiliar"
							:model="nuevoPublicador.auxiliar"
						/>
					</div>
					<div>
						<label for="regular">Precursor Regular</label>
						<input
							type="radio"
							id="regular"
							name="precursor"
							:model="nuevoPublicador.regular"
						/>
					</div>
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
