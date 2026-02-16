<template>
  <transition name="fade">
    <div v-if="store.showCartModal" class="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div class="absolute inset-0 bg-black/50" @click="close"></div>

      <div class="relative bg-white w-[820px] max-w-[95%] rounded shadow-lg z-50">
        <button
          class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center"
          @click="close"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left: added product with success header -->
          <div class="flex flex-col justify-start">
            <div class="flex items-center gap-3 text-green-600 font-semibold mb-6">
              <span class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clip-rule="evenodd" /></svg>
              </span>
              <div class="text-sm">
                <div class="text-green-600 font-semibold">Product Successfully Added To</div>
                <div class="text-green-600 font-semibold">Your Shopping Cart</div>
              </div>
            </div>

            <div class="flex items-start gap-6">
              <div class="w-40 h-56 bg-gray-100 flex items-center justify-center p-3">
                <img :src="itemImage" :alt="itemName" class="max-h-full object-contain" />
              </div>
            </div>

            <div class="mt-4 text-sm text-gray-700">{{ itemIdAndName }}</div>
          </div>

          <!-- Right: summary and actions -->
          <div class="flex flex-col items-center justify-center">
            <div class="text-sm text-gray-500">THERE ARE <span class="font-medium text-gray-800">{{ distinctItems }}</span> ITEMS IN YOUR CART.</div>
            <div class="text-2xl font-medium text-gray-800 mt-3">Total Price: ${{ formattedTotalPrice }} USD</div>

            <div class="mt-6 w-full flex flex-col items-center gap-4">
              <button @click="continueShopping" class="w-3/4 border border-gray-300 py-3 text-sm uppercase tracking-wider">CONTINUE SHOPPING</button>
              <button @click="viewCart" class="w-3/4 border border-gray-300 py-3 text-sm uppercase tracking-wider">VIEW CART</button>

              <label class="flex items-center gap-2 mt-2 text-sm text-gray-600">
                <input type="checkbox" v-model="agreeTerms" class="w-4 h-4" />
                I agree with the terms and conditions
              </label>

              <button :disabled="!agreeTerms" @click="checkout" class="w-3/4 mt-3 bg-[#e98891] disabled:opacity-50 text-white py-3 uppercase tracking-wider">CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import useCartStore from '@/stores/cart'

const store = useCartStore()
const router = useRouter()
const agreeTerms = ref(false)

const item = computed(() => store.lastAddedItem || {})
const itemName = computed(() => item.value.name || '')
const itemImage = computed(() => item.value.image || item.value.hover_image || '')
const itemQuantity = computed(() => item.value.quantity || 1)
const itemIdAndName = computed(() => {
  if (!item.value || !item.value.id) return itemName.value
  return `${item.value.id}. ${itemName.value}`
})
const formattedTotalPrice = computed(() => (store.totalPrice || 0).toFixed(2))

// number of distinct items in cart (unique products)
const distinctItems = computed(() => {
  const list = store.items || []
  const ids = new Set(list.map(i => i.id))
  return ids.size
})

watch(() => store.showCartModal, (val) => {
  if (val) store.fetchCart().catch(() => {})
})

const close = () => {
  store.clearModal()
}

const continueShopping = () => {
  store.clearModal()
}

const viewCart = () => {
  store.clearModal()
  router.push({ name: 'cartpage' })
}

const checkout = () => {
  store.clearModal()
  router.push({ name: 'checkout' })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s }
.fade-enter-from, .fade-leave-to { opacity: 0 }
</style>
