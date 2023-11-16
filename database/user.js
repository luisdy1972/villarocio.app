import { ref } from 'vue'
import { auth, provider } from '@db'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from 'firebase/auth'

let user = ref({})

// if (localStorage.getItem('sign')) {
// 	let userInLocalStorage = JSON.parse(localStorage.getItem('sign'))
// 	user.value = userInLocalStorage.user
// }

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
				// localStorage.setItem('sign', JSON.stringify(result))
				// console.log(JSON.parse(localStorage.getItem('sign')))
				user.value = result.user
				console.log('Login 👌', user.value.uid)
				email.value = ''
				password.value = ''
			}
		)
	} catch (error) {
		alert('Usuario o contraseña incorrecta')
		console.error(error)
	}
}

async function LoginConGoogle() {
	signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			// const credential = GoogleAuthProvider.credentialFromResult(result)
			// const token = credential.accessToken
			// console.log(token)
			// localStorage.setItem('sign', JSON.stringify(result))
			user.value = result.user
			console.log('Login 👌', user.value.uid)
			// getNotas()
		})
		.catch((error) => {
			console.log('Login 👎🏻', 'Algo salió mal')
			console.error(error)
		})
}

async function EndSession() {
	signOut(auth).then(() => {
		console.log('Adios ✌', user.value.uid)
		// localStorage.removeItem('sign')
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
