<template>
  <div class="w-full bg-white">
    <!-- Breadcrumb -->
    <div class="bg-[#f8f8f8] border-b py-4">
      <div class="max-w-[1400px] mx-auto px-6">
        <nav class="flex items-center gap-2 text-sm">
          <RouterLink to="/" class="text-[#c9a96e] hover:text-[#b89860]">Home</RouterLink>
          <span class="text-gray-400">/</span>
          <span class="text-gray-500">Your Shopping Cart</span>
        </nav>
      </div>
    </div>

    <!-- Cart Content -->
    <div class="max-w-[1400px] mx-auto px-6 py-12">
      <!-- Cart Table -->
      <div class="border mb-8 overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-sm uppercase text-[#c9a96e]">
              <th class="py-5 px-6 text-center font-medium border-r">Product</th>
              <th class="py-5 px-6 text-center font-medium border-r">Price</th>
              <th class="py-5 px-6 text-center font-medium border-r">Quantity</th>
              <th class="py-5 px-6 text-center font-medium border-r">Total</th>
              <th class="py-5 px-6 text-center font-medium w-20"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartItems" :key="index" class="border-t">
              <!-- Product -->
              <td class="py-8 px-6 border-r">
                <div class="flex items-center gap-6">
                  <div class="w-24 h-24 bg-gray-50 flex-shrink-0 p-2">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
                  </div>
                  <span class="text-gray-600">{{ item.id }}. {{ item.name }}</span>
                </div>
              </td>
              <!-- Price -->
              <td class="py-8 px-6 text-center text-gray-700 border-r">${{ item.price.toFixed(2) }}</td>
              <!-- Quantity -->
              <td class="py-8 px-6 border-r">
                <div class="flex items-center justify-center gap-2">
                  <button 
                    @click="decreaseQuantity(index)" 
                    class="text-gray-400 hover:text-black transition text-lg"
                  >
                    −
                  </button>
                  <div class="w-12 text-center">
                    <span class="text-gray-700">{{ item.quantity }}</span>
                    <div class="border-b border-gray-300 mt-1"></div>
                  </div>
                  <button 
                    @click="increaseQuantity(index)" 
                    class="text-gray-400 hover:text-black transition text-lg"
                  >
                    +
                  </button>
                </div>
              </td>
              <!-- Total -->
              <td class="py-8 px-6 text-center text-gray-700 border-r">${{ (item.price * item.quantity).toFixed(2) }}</td>
              <!-- Remove -->
              <td class="py-8 px-6 text-center">
                <button 
                  @click="removeItem(index)" 
                  class="w-10 h-10 border border-gray-300 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:border-gray-400 transition mx-auto"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </td>
            </tr>
            <!-- Empty Cart -->
            <tr v-if="cartItems.length === 0">
              <td colspan="5" class="py-12 text-center text-gray-500">Your cart is empty</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-3 justify-end mb-16">
        <button class="px-8 py-3.5 bg-[#c9a96e] text-white text-sm uppercase tracking-wider hover:bg-[#b89860] transition">
          Update Cart
        </button>
        <RouterLink 
          to="/shop" 
          class="px-8 py-3.5 bg-[#3d3d3d] text-white text-sm uppercase tracking-wider hover:bg-black transition"
        >
          Continue Shopping
        </RouterLink>
        <button 
          @click="clearCart"
          class="px-8 py-3.5 bg-[#3d3d3d] text-white text-sm uppercase tracking-wider hover:bg-black transition"
        >
          Clear Cart
        </button>
      </div>

      <!-- Bottom Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Left Column -->
        <div class="space-y-12">
          <!-- Delivery Date & Time -->
          <div>
            <h3 class="text-xl text-gray-700 mb-6">Pick a delivery date and Time</h3>
            <div class="space-y-4">
              <div class="border border-gray-300 py-3 px-4 w-80 flex items-center gap-3">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <input type="date" class="w-full outline-none text-gray-600 bg-transparent" />
              </div>
              <div class="border border-gray-300 py-3 px-4 w-64">
                <input type="text" placeholder="Write delivery time" class="w-full outline-none text-gray-400" />
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-5 max-w-md leading-relaxed">
              Pick delivery date and time as you choose. Delivery Time takes place between 12PM - 4PM MON-FRI AND 8AM-11AM SAT.
            </p>
          </div>

          <!-- Shipping Estimates -->
          <div>
            <h3 class="text-xl text-gray-700 mb-6">Get shipping estimates</h3>
            <div class="space-y-4">
              <div class="border border-gray-300 py-3 px-4 w-80">
                <select class="w-full outline-none text-gray-500 bg-transparent">
                  <option>---</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                </select>
              </div>
              <div class="border border-gray-300 py-3 px-4 w-52">
                <input type="text" placeholder="Zip/Postal Code" class="w-full outline-none text-gray-400" />
              </div>
              <button class="px-8 py-3.5 bg-[#3d3d3d] text-white text-sm uppercase tracking-wider hover:bg-black transition">
                Calculate Shipping
              </button>
            </div>
          </div>
        </div>

        <!-- Right Column - Cart Totals -->
        <div>
          <div class="bg-[#f8f8f8] p-10">
            <h3 class="text-2xl text-center text-gray-800 mb-8">Cart Totals</h3>
            
            <table class="w-full border border-gray-200">
              <tbody>
                <tr class="border-b border-gray-200">
                  <td class="py-4 px-6 text-sm uppercase text-gray-600 border-r border-gray-200 bg-white">Subtotal</td>
                  <td class="py-4 px-6 text-right text-gray-600 bg-white">${{ cartSubtotal.toFixed(2) }}</td>
                </tr>
                <tr>
                  <td class="py-4 px-6 text-sm uppercase text-gray-600 border-r border-gray-200 bg-white">Total</td>
                  <td class="py-4 px-6 text-right text-gray-800 font-medium bg-white">${{ cartSubtotal.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>

            <div class="mt-8">
              <label class="flex items-center gap-3 cursor-pointer mb-5">
                <input type="checkbox" v-model="agreeTerms" class="w-4 h-4 border-gray-300" />
                <span class="text-sm text-gray-600">I agree with the terms and conditions</span>
              </label>

              <button
                class="w-full py-4 bg-[#e8a0a0] text-white text-sm uppercase tracking-wider hover:bg-[#d89090] transition rounded-sm"
                :class="{ 'opacity-50 cursor-not-allowed': !agreeTerms }"
                :disabled="!agreeTerms"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- You Can Also Buy Section -->
      <div class="mt-20">
        <h2 class="text-2xl text-center text-gray-800 mb-10">You can also buy</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="product in recommendedProducts" :key="product.id" class="group">
            <div class="bg-[#f8f8f8] aspect-square flex items-center justify-center mb-4 p-8">
              <img :src="product.image" :alt="product.name" class="max-h-full object-contain" />
            </div>
            <h4 class="text-sm text-gray-700 mb-1">{{ product.name }}</h4>
            <p class="text-sm text-gray-800">${{ product.price.toFixed(2) }}</p>
          </div>
        </div>

        <!-- Pagination Dots -->
        <div class="flex justify-center gap-2 mt-8">
          <button class="w-3 h-3 rounded-full border border-gray-400"></button>
          <button class="w-3 h-3 rounded-full bg-gray-400"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import useCartStore from '@/stores/cart'

const store = useCartStore()
const agreeTerms = ref(false)

const cartItems = computed(() => {
  const raw = store.items || []
  return raw.map(i => ({
    ...i,
    price: parseFloat(i.price) || 0,
    quantity: parseInt(i.quantity || 0, 10) || 0,
  }))
})

onMounted(() => {
  store.fetchCart().catch(() => {})
})
const recommendedProducts = ref([
  {
    id: 1,
    name: 'Product Title',
    price: 99.99,
    image: 'https://img.icons8.com/ios/200/backpack.png'
  },
  {
    id: 2,
    name: 'Product Title',
    price: 99.99,
    image: 'https://img.icons8.com/ios/200/sneakers.png'
  },
  {
    id: 3,
    name: 'Product Title',
    price: 99.99,
    image: 'https://img.icons8.com/ios/200/glasses.png'
  },
  {
    id: 4,
    name: 'Product Title',
    price: 99.99,
    image: 'https://img.icons8.com/ios/200/baseball-cap.png'
  }
])

const cartSubtotal = computed(() => {
  return (store.totalPrice || 0)
})

const increaseQuantity = async (index) => {
  const item = cartItems.value[index]
  const next = (parseInt(item.quantity || 0, 10) || 0) + 1
  await store.updateQuantity(item.id, next)
}

const decreaseQuantity = async (index) => {
  const item = cartItems.value[index]
  const current = parseInt(item.quantity || 0, 10) || 0
  if (current > 1) {
    await store.updateQuantity(item.id, current - 1)
  }
}

const removeItem = async (index) => {
  const item = cartItems.value[index]
  if (!item) return
  await store.removeItem(item.id)
}

const clearCart = async () => {
  await store.clearCart()
}
</script>
