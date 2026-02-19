import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { setAuthToken } from '@/services/api'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {
	position: 'top-right',
	timeout: 3000,
})
// initialize API auth token from localStorage
try {
  const t = localStorage.getItem('token')
  if (t) setAuthToken(t)
} catch (_) {}
app.mount('#app')
