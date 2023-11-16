import { ref } from 'vue'
import { auth, provider } from '@db'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'

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
				user.value = result.user
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
	signInWithPopup(auth, provider)
		.then((result) => {
			user.value = result.user
			console.log('Login 👌')
		})
		.catch((error) => {
			console.log('Login 👎🏻', 'Algo salió mal')
			console.error(error)
		})
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
