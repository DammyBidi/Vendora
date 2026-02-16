<template>
  <div class="w-full bg-white">
    <!-- Breadcrumb -->
    <div class="border-b py-4">
      <div class="max-w-[1400px] mx-auto px-6">
        <nav class="flex items-center gap-2 text-sm">
          <RouterLink to="/" class="text-[#c9a96e] hover:text-[#b89860]">Home</RouterLink>
          <span class="text-gray-400">/</span>
          <span class="text-gray-500">Create Account</span>
        </nav>
      </div>
    </div>

    <!-- Register Form Section -->
    <div class="max-w-[1400px] mx-auto px-6 py-20">
      <div class="max-w-2xl mx-auto">
        <div class="bg-[#f5f5f5] p-12">
          <!-- Title -->
          <h1 class="text-3xl font-light text-center mb-3 text-gray-800">Create Account</h1>
          <p class="text-center text-gray-500 mb-10">Please Register using account detail bellow.</p>

          <!-- Form -->
          <form @submit.prevent="handleRegister" class="space-y-6">
            <div>
              <label class="block text-gray-600 mb-2 text-sm">First Name</label>
              <input
                v-model="firstName"
                type="text"
                placeholder="First Name"
                class="w-full px-4 py-4 bg-white border-l-2 border-l-transparent focus:border-l-[#c9a96e] outline-none transition text-gray-700"
              />
            </div>

            <div>
              <label class="block text-gray-600 mb-2 text-sm">Last Name</label>
              <input
                v-model="lastName"
                type="text"
                placeholder="Last Name"
                class="w-full px-4 py-4 bg-white border-l-2 border-l-transparent focus:border-l-[#c9a96e] outline-none transition text-gray-700"
              />
            </div>

            <div>
              <label class="block text-gray-600 mb-2 text-sm">Email</label>
              <input
                v-model="email"
                type="email"
                placeholder="Email"
                class="w-full px-4 py-4 bg-white border-l-2 border-l-transparent focus:border-l-[#c9a96e] outline-none transition text-gray-700"
              />
            </div>

            <div>
              <label class="block text-gray-600 mb-2 text-sm">Password</label>
              <input
                v-model="password"
                type="password"
                placeholder="Password"
                class="w-full px-4 py-4 bg-white border-l-2 border-l-transparent focus:border-l-[#c9a96e] outline-none transition text-gray-700"
              />
            </div>

            <div>
              <label class="block text-gray-600 mb-2 text-sm">Phone Number</label>
              <input
                v-model="phoneNumber"
                type="tel"
                placeholder="+1234567890"
                class="w-full px-4 py-4 bg-white border-l-2 border-l-transparent focus:border-l-[#c9a96e] outline-none transition text-gray-700"
              />
            </div>

            <div>
              <label class="block text-gray-600 mb-2 text-sm">Address</label>
              <input
                v-model="address"
                type="text"
                placeholder="123 Test Street"
                class="w-full px-4 py-4 bg-white border-l-2 border-l-transparent focus:border-l-[#c9a96e] outline-none transition text-gray-700"
              />
            </div>

            <!-- Error/Success Messages -->
            <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
            <div v-if="success" class="text-green-600 text-sm">{{ success }}</div>

            <div class="pt-4">
              <button
                type="submit"
                :disabled="loading"
                class="bg-[#3d3d3d] text-white px-10 py-4 text-sm uppercase tracking-wider hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ loading ? 'Creating...' : 'Create' }}
              </button>
            </div>

            <div class="pt-2">
              <RouterLink to="/" class="text-gray-600 hover:text-[#c9a96e] transition text-sm">
                Return to Store
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
import { RouterLink, useRouter } from 'vue-router'
import { authService } from '@/services'

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const phoneNumber = ref('')
const address = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const handleRegister = async () => {
  error.value = ''
  success.value = ''
  loading.value = true

  try {
    const userData = {
      name: `${firstName.value} ${lastName.value}`.trim(),
      email: email.value,
      password: password.value,
      phone_number: phoneNumber.value,
      address: address.value
    }

    const { data } = await authService.register(userData)
    
    // Store the token
    localStorage.setItem('token', data.token)
    
    success.value = data.message || 'Registration successful!'
    
    // Redirect to home after short delay
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
