import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth'
import { firebaseConfig } from './firebaseConfig'
import {
	getFirestore,
	collection,
	doc,
	query,
	getDocs,
	addDoc,
	setDoc,
	deleteDoc,
	where,
	updateDoc,
} from 'firebase/firestore'

import {
	user,
	email,
	password,
	LoginConGoogle,
	SignInEmail,
	SignUpEmail,
	EndSession,
} from './user.js'

const app = initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()
const auth = getAuth(app)
auth.languageCode = 'es'
const db = getFirestore(app)

// evento que vigila la autenticación
onAuthStateChanged(auth, async (userLogin) => {
	if (!userLogin) {
		user.value = {}
	} else {
		user.value = userLogin
	}
})

async function buscarDocumentos(colle, condition) {
	// el id del documento en una pripiedad del documento
	let documentos = []
	if (condition) {
		try {
			const consulta = await getDocs(
				query(
					collection(db, colle),
					where(condition[0], condition[1], condition[2])
				)
			)
			consulta.forEach((doc) => {
				let documento = doc.data()
				documento.id = doc.id
				documentos.push(documento)
			})
			return documentos
		} catch (err) {
			console.error(err)
		}
	} else {
		// el id del documento en una pripiedad del documento
		try {
			const consulta = await getDocs(query(collection(db, colle)))
			consulta.forEach((doc) => {
				let documento = doc.data()
				documento.id = doc.id
				documentos.push(documento)
			})
			return documentos
		} catch (err) {
			console.error(err)
		}
	}
}

async function actualizarDocumento(colle, id, data) {
	try {
		return await updateDoc(doc(db, colle, id), data)
	} catch (error) {
		console.error(error)
	}
}

async function guardarActualizarDocumento(colle, data, id) {
	try {
		if (!id) {
			return await addDoc(collection(db, colle), data)
		} else {
			return await setDoc(doc(db, colle, id), data)
		}
	} catch (error) {
		console.error(error)
	}
}

async function eliminarDocumento(colle, id) {
	try {
		return await deleteDoc(doc(db, colle, id))
	} catch (error) {
		console.error(error)
	}
}

export {
	firebaseConfig,
	app,
	provider,
	auth,
	db,
	user,
	email,
	password,
	LoginConGoogle,
	SignInEmail,
	SignUpEmail,
	EndSession,
	buscarDocumentos,
	guardarActualizarDocumento,
	actualizarDocumento,
	eliminarDocumento,
}
