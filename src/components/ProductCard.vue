<template>
  <div class="group" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <RouterLink :to="{ name: 'productdetail', params: { id: product.id } }" class="block">
      <div class="relative bg-[#f5f5f5] aspect-[4/5] overflow-hidden">
        <!-- SALE BADGE -->
        <span
          v-if="product.oldPrice || product.sale"
          class="absolute top-4 left-4 bg-[#7fc7b2] text-white text-[11px] px-4 py-1.5 rounded-full z-10"
        >
          SALE
        </span>

        <!-- DISCOUNT PERCENTAGE BADGE -->
        <span
          v-if="discountPercentage"
          class="absolute top-14 left-4 bg-[#7fc7b2] text-white text-[11px] px-3 py-1.5 rounded-full z-10"
        >
          -{{ discountPercentage }}%
        </span>

        <!-- Main Image -->
        <img
          :src="product.image"
          :alt="product.name"
          class="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />

        <!-- RIGHT SIDE ACTION BUTTONS -->
        <div
          class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          <button 
            @click.prevent="addToWishlist"
            class="w-10 h-10 bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button 
            @click.prevent="compare"
            class="w-10 h-10 bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>
          <button 
            @click.prevent="quickView"
            class="w-10 h-10 bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <!-- VARIANT OPTIONS (if product has variants) -->
        <div
          v-if="product.variants && product.variants.length"
          class="absolute bottom-0 left-0 right-0 bg-white/95 py-3 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <!-- Sizes -->
          <div class="flex justify-center gap-3 text-xs text-gray-600 mb-2">
            <span v-for="size in availableSizes" :key="size" class="hover:text-black cursor-pointer">{{ size }}</span>
          </div>
          <!-- Color swatches -->
          <div class="flex justify-center gap-2">
            <span 
              v-for="(variant, idx) in product.variants.slice(0, 5)" 
              :key="idx"
              class="w-6 h-6 rounded-sm border border-gray-200 cursor-pointer hover:border-gray-400"
              :style="{ backgroundImage: `url(${variant.image || product.image})`, backgroundSize: 'cover' }"
            ></span>
          </div>
        </div>
      </div>
    </RouterLink>

    <!-- PRODUCT INFO -->
    <div class="mt-4 text-left">
      <!-- Add to cart / Select Options (appears on hover) -->
      <div class="h-6 mb-1">
        <button
          v-if="isHovered"
          @click="product.variants?.length ? selectOptions() : addToCart()"
          class="text-[#e74c3c] text-sm font-medium hover:text-[#c0392b] transition flex items-center gap-1"
        >
          <span class="text-lg">+</span>
          {{ product.variants?.length ? 'Select Options' : 'Add to cart' }}
        </button>
        <RouterLink 
          v-else
          :to="{ name: 'productdetail', params: { id: product.id } }"
          class="text-sm text-gray-700 hover:text-[#c9a96e] transition"
        >
          {{ product.id }}. {{ product.name }}
        </RouterLink>
      </div>

      <!-- Price -->
      <p class="text-sm">
        <span class="text-gray-800">${{ formatPrice(product.price) }}</span>
        <span
          v-if="product.oldPrice"
          class="text-gray-400 line-through ml-2"
        >
          ${{ formatPrice(product.oldPrice) }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import useCartStore from '@/stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const isHovered = ref(false)

const discountPercentage = computed(() => {
  if (props.product.oldPrice && props.product.price) {
    const discount = ((props.product.oldPrice - props.product.price) / props.product.oldPrice) * 100
    return Math.round(discount)
  }
  return null
})

const availableSizes = computed(() => {
  if (props.product.variants) {
    const sizes = [...new Set(props.product.variants.map(v => v.size).filter(Boolean))]
    return sizes.length ? sizes : ['S', 'M', 'L', 'XL']
  }
  return []
})

const formatPrice = (price) => {
  return parseFloat(price).toFixed(2)
}

const cart = useCartStore()

const addToCart = async () => {
  try {
    await cart.addToCart(props.product.id, 1)
    // UI (modal) state is controlled by the store: cart.showCartModal
  } catch (e) {
    console.error('Failed to add to cart', e)
  }
}

const selectOptions = () => {
  console.log('Select options:', props.product.id)
  // TODO: Navigate to product detail
}

const addToWishlist = () => {
  console.log('Add to wishlist:', props.product.id)
  // TODO: Implement wishlist
}

const compare = () => {
  console.log('Compare:', props.product.id)
  // TODO: Implement compare
}

const quickView = () => {
  console.log('Quick view:', props.product.id)
  // TODO: Implement quick view modal
}
</script>

<style scoped>
.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
