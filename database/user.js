import { ref } from 'vue'
import { auth, provider } from '@db'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'

let user = ref({})

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
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result)
				user.value = result.user
				console.log('Login 👌', user.value)
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
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result)
			user.value = result.user
			console.log('Login 👌', user.value)
		})
		.catch((error) => {
			console.log('Login 👎🏻', 'Algo salió mal')
			console.error(error)
		})
}

async function EndSession() {
	signOut(auth).then(() => {
		user.value = {}
		console.log('Adios ✌', user.value.uid)
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
