import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import firebaseConfig from './firebaseConfig'
import {
	user,
	email,
	password,
	LoginConGoogle,
	SignInEmail,
	SignUpEmail,
	EndSession,
} from './user.js'
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

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
auth.languageCode = 'es'
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

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
	db,
	auth,
	provider,
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
