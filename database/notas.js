import { ref } from 'vue'
import { user, firebaseConfig } from '@db'

import {
	getFirestore,
	collection,
	doc,
	query,
	where,
	getDocs,
	addDoc,
	setDoc,
} from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const notas = ref([])

async function getNotas() {
	// preparar consulta las referencias
	const notasRef = collection(db, 'notas')
	const q = query(notasRef, where('userID', '==', user.value.uid))
	// Ejecutar consulta
	const QuerySnapshot = await getDocs(q)
	QuerySnapshot.forEach((doc) => {
		let nota = doc.data()
		console.log(nota)
		notas.value.push(nota)
	})
}

async function addNota(text) {
	const fetchFecha = new Date().toISOString()

	const notaEjemplo = {
		nota: text,
		userID: user.value.uid,
		realizado: false,
		fecha: fetchFecha,
	}
	try {
		const notaRef = await addDoc(collection(db, 'notas'), notaEjemplo)
		await setDoc(notaRef, notaEjemplo)
		// actualizamos la lista de notas a mostrar
		notas.value = []
		getNotas()
	} catch (error) {
		console.error(error)
	}
}
export { notas, getNotas, addNota }
