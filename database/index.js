import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

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
const auth = getAuth(app)
auth.languageCode = 'es'

const provider = new GoogleAuthProvider()

export {
	app,
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
