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
} from 'firebase/firestore'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
auth.languageCode = 'es'
const provider = new GoogleAuthProvider()
const db = getFirestore(app)

async function buscarDocumentos(col, condition) {
	// el id del documento en una pripiedad del documento
	let documentos = []
	try {
		const consulta = await getDocs(query(collection(db, col)))
		consulta.forEach((doc) => {
			let documento = doc.data()
			documento.id = doc.id
			documentos.push(documento)
		})
		return documentos
	} catch (err) {}
}

async function guardarActualizarDocumento(col, data, id) {
	try {
		if (!id) {
			return await addDoc(collection(db, col), data)
		} else {
			return await setDoc(doc(db, col, id), data)
		}
	} catch (error) {
		console.error(error)
	}
}

async function eliminarDocumento(col, id) {
	try {
		return await deleteDoc(doc(db, col, id))
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
	eliminarDocumento,
}
