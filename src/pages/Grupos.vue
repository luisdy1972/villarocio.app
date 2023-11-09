<script setup>
import { ref, onMounted } from 'vue'

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
		</div>
		<div id="listado-grupo">
			<RouterView></RouterView>
		</div>
	</section>
</template>

<style scoped></style>
