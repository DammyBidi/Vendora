<template>
  <div class="max-w-[1400px] mx-auto px-6 py-12">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-4xl font-medium">My Account</h1>
      <button
        v-if="user"
        @click="handleLogout"
        class="text-sm text-gray-700 hover:text-black"
      >
        Logout
      </button>
    </div>

    <div class="border-t" />

    <section class="mt-8">
      <h2 class="text-2xl font-semibold mb-3">Account Details</h2>
      <div v-if="user" class="text-gray-800 space-y-2">
        <p class="text-lg">{{ user.name }}</p>
        <p class="text-sm text-gray-600">{{ user.email }}</p>
        <p class="text-sm text-gray-600">{{ user.phone_number }}</p>
        <p class="text-sm text-gray-600">{{ user.address }}</p>
      </div>
      <div v-else class="text-gray-500">Loading account details…</div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authService from '@/services/authService'

const user = ref(null)
const router = useRouter()

const fetchUser = async () => {
  try {
    const { data } = await authService.getUser()
    user.value = data.user
  } catch (e) {
    // If fetching fails (unauthenticated), redirect to login
    try { await authService.logout() } catch (err) {}
    router.push({ name: 'login' })
  }
}

onMounted(() => {
  fetchUser()
})

const handleLogout = async () => {
  try {
    await authService.logout()
  } catch (e) {
    // ignore
  }
  router.push({ name: 'home' })
}
</script>

<style scoped></style>
