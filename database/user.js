import { ref } from 'vue'
import { auth, provider } from '@db'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'

export const user = ref({
	displayName: '',
	uid: '',
})

if (localStorage.getItem('sign')) {
	let userInLocalStorage = JSON.parse(localStorage.getItem('sign'))
	user.value = userInLocalStorage.user
	// console.log(user.value)
}

export const email = ref('')
export const password = ref('')

export async function SignUpEmail() {
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

export async function SignInEmail() {
	try {
		signInWithEmailAndPassword(auth, email.value, password.value).then(
			(result) => {
				// console.log(result)
				localStorage.setItem('sign', JSON.stringify(result))
				console.log(JSON.parse(localStorage.getItem('sign')))
				user.value = result.user
				user.value.displayName = result.user.email
				console.log('Login 👌', user.value.displayName)
				email.value = ''
				password.value = ''
				// getNotas()
			}
		)
	} catch (error) {
		alert('Usuario o contraseña incorrecta')
		console.error(error)
	}
}

export async function LoginConGoogle() {
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			// const credential = GoogleAuthProvider.credentialFromResult(result)
			// const token = credential.accessToken
			// console.log(token)
			localStorage.setItem('sign', JSON.stringify(result))
			user.value = result.user
			console.log('Login 👌', user.value.displayName)
			// getNotas()
		})
		.catch((error) => {
			console.log('Login 👎🏻', 'Algo salió mal')
			console.error(error)
		})
}

export async function EndSession() {
	console.log('Adios ✌', user.value.displayName)
	user.value = {}
	localStorage.clear('signEmail')
	signOut(auth)
}
