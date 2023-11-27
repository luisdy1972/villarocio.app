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
		alert('Email ya fué registrado o no es valido.')
	}
}

async function SignInEmail() {
	return await signInWithEmailAndPassword(auth, email.value, password.value)
}

async function LoginConGoogle() {
	return await signInWithPopup(auth, provider)
}

async function EndSession() {
	return await signOut(auth)
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
