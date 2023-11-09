<script setup>
import { ref, onMounted, watchEffect } from 'vue'

import { CardGrup, Loading } from '@/components'

import { user, db } from '@db'
import {
	collection,
	doc,
	query,
	getDocs,
	addDoc,
	setDoc,
	deleteDoc,
} from 'firebase/firestore'

const grupos = ref([])

async function buscarGrupos() {
	try {
		const gruposRef = collection(db, 'grupos')
		const q = query(gruposRef)
		let QuerySnapshot = await getDocs(q)
		QuerySnapshot.forEach((doc) => {
			const grupo = {
				id: doc.id,
				numero: doc.data().numero,
				responsable: doc.data().responsable,
			}
			grupos.value.push(grupo)
		})
		// console.log(grupos.value)
	} catch (error) {}
}

watchEffect(() => {
	console.log('se actualizó algún ref')
})

onMounted(() => {
	buscarGrupos()
})
</script>
<template>
	<section class="container">
		<h2 class="pt-4 pb-3 mb-4 border-bottom">Gupos</h2>
		<div v-if="grupos.length == 0">
			<Loading></Loading>
		</div>
		<div class="d-flex justify-content-center flex-wrap mb-5">
			<CardGrup
				class="m-1"
				v-for="grupo in grupos"
				:numero="grupo.numero"
				:responsable="grupo.responsable"
			/>
			<!-- agregar grupo -->
			<div v-if="user.displayName" class="card card-person m-1">
				<h5 class="card-header">Agregar Grupo</h5>
				<div class="card-body d-flex flex-column justify-content-center">
					<input type="text" placeholder="Nombre" class="form-control" />
					<input type="number" placeholder="Número" class="form-control mt-3" />
					<a class="btn btn-primary mt-3">Agregar</a>
				</div>
			</div>
		</div>
		<div id="listado-grupo">
			<RouterView></RouterView>
		</div>
	</section>
</template>

<style scoped></style>
