import { createApp } from 'vue'
import './assets/js/bootstrap'
import './assets/css/bootstrap.css'
import router from './router'
import App from './App.vue'

createApp(App).use(router).mount('#app')
