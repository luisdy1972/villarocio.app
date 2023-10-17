import { ref } from 'vue'
import { user } from '@db'

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

const firebaseConfig = {
	apiKey: 'AIzaSyBe7q1JvdSV-SnDO5R0I80cvKLGiy8hUdQ',
	authDomain: 'villarocio-ba5a1.firebaseapp.com',
	databaseURL:
		'https://villarocio-ba5a1-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'villarocio-ba5a1',
	storageBucket: 'villarocio-ba5a1.appspot.com',
	messagingSenderId: '1006611164581',
	appId: '1:1006611164581:web:08da8b68a35f2521e28c4c',
}

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

// async function updateNota(text, id) {
// 	const notaEjemplo = {
// 		nota: text,
// 		userID: user.value.uid,
// 			realizado: false,
// 		}
// 		try {
// 		const notaRef = doc(db, 'notas', id)
// 		await setDoc(notaRef, notaEjemplo)
// actualizamos la lista de notas a mostrar
// 		notas.value = []
// 		getNotas()
// 	} catch (error) {
// 		console.error(error)
// 	}
// }

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
