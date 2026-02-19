<template>
  <div class="w-full bg-white">
    <!-- Breadcrumb -->
    <div class="border-b py-4">
      <div class="max-w-[1400px] mx-auto px-6">
        <nav class="flex items-center gap-2 text-sm">
          <RouterLink to="/" class="text-[#c9a96e] hover:text-[#b89860]">Home</RouterLink>
          <span class="text-gray-400">/</span>
          <span class="text-gray-500">Account</span>
        </nav>
      </div>
    </div>

    <!-- Login Form Section -->
    <div class="max-w-[1400px] mx-auto px-6 py-20">
      <div class="max-w-2xl mx-auto">
        <div class="bg-[#f5f5f5] p-12">
          <!-- Title -->
          <h1 class="text-3xl font-light text-center mb-3 text-gray-800">Login</h1>
          <p class="text-center text-gray-500 mb-10">Please login using account detail bellow.</p>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="w-full px-4 py-4 bg-white border-l-2 border-l-transparent focus:border-l-[#c9a96e] outline-none transition text-gray-700"
              />
            </div>

            <div>
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="w-full px-4 py-4 bg-white border-l-2 border-l-transparent focus:border-l-[#c9a96e] outline-none transition text-gray-700"
              />
            </div>

            <!-- Error/Success Messages -->
            <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
            <div v-if="success" class="text-green-600 text-sm">{{ success }}</div>

            <div class="flex items-center justify-between pt-2">
              <button
                type="submit"
                :disabled="loading"
                class="bg-[#3d3d3d] text-white px-10 py-4 text-sm uppercase tracking-wider hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ loading ? 'Signing In...' : 'Sign In' }}
              </button>

              <a href="#" class="text-gray-500 hover:text-[#c9a96e] transition text-sm">
                Forgot your password?
              </a>
            </div>

            <div class="pt-2">
              <RouterLink :to="{ name: 'register' }" class="text-gray-600 hover:text-[#c9a96e] transition text-sm">
                Create account
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { authService } from '@/services'
import { setAuthToken } from '@/services/api'
import { useToast } from 'vue-toastification'

const router = useRouter()
const route = useRoute()
const toast = useToast()

const email = ref('')
const password = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const handleLogin = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    const { data } = await authService.login({
      email: email.value,
      password: password.value
    })
    
    // Store the token
    localStorage.setItem('token', data.token)
    // set token for api requests
    setAuthToken(data.token)
    
    success.value = data.message || 'Login successful!'
    toast.success(success.value)

    // Redirect to original destination if provided
    const redirectTo = (route.query && route.query.redirect) ? String(route.query.redirect) : '/'
    router.push(redirectTo)
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}
</script>
