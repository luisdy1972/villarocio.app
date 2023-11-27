import { ref } from 'vue'
import { auth, provider } from '@db'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'

// usuario y credenciales
const user = ref({})
const email = ref('')
const password = ref('')

async function SignUpEmail() {
	try {
		createUserWithEmailAndPassword(auth, email.value, password.value).then(
			(e) => {
				email.value = ''
				password.value = ''
				console.log('Registro exitóso')
				console.log(e)
			}
		)
	} catch (error) {
		console.error(error)
		alert('Email ya fué registrado o no es valido')
	}
}

async function SignInEmail() {
	try {
		signInWithEmailAndPassword(auth, email.value, password.value).then(
			(result) => {
				console.log('Login 👌')
				email.value = ''
				password.value = ''
			}
		)
	} catch (error) {
		console.error('Usuario o contraseña incorrecta')
		console.error(error)
	}
}

async function LoginConGoogle() {
	return await signInWithPopup(auth, provider)
}

async function EndSession() {
	signOut(auth).then(() => {
		console.log('Adios ✌')
	})
}

export {
	user,
	email,
	password,
	EndSession,
	LoginConGoogle,
	SignInEmail,
	SignUpEmail,
}
