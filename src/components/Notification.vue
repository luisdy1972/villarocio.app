<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
	titulo: String,
	mensaje: String,
})

const clase = ref('d-none')

function mostrar() {
	clase.value = 'show'
}
function cerrar() {
	clase.value = 'd-none'
}

onMounted(() => {
	mostrar()
})
</script>
<template>
	<div :class="`${clase} toast fade position-fixed bottom-0 end-0 p-3 m-3 z-3`">
		<div class="toast-header">
			<svg
				class="bd-placeholder-img rounded me-2"
				width="10"
				height="10"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				preserveAspectRatio="xMidYMid slice"
				focusable="false"
			>
				<rect width="100%" height="100%" fill="#007aff"></rect>
			</svg>
			<strong class="me-auto">{{ props.titulo }}</strong>
			<small>11 mins ago</small>
			<button @click="cerrar()" type="button" class="btn-close"></button>
		</div>
		<div class="toast-body">{{ props.mensaje }}</div>
	</div>
</template>

<style scoped></style>
