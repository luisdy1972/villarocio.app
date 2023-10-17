import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
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

import { notas, getNotas, addNota } from '@db/notas.js'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
auth.languageCode = 'es'

const provider = new GoogleAuthProvider()

const db = getFirestore(app)

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
	notas,
	getNotas,
	addNota,
}
