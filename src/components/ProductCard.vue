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
          <div class="relative">
            <button
              :aria-pressed="isInWishlist"
              @mouseenter="hoveredButton = isInWishlist ? 'remove' : 'wishlist'"
              @mouseleave="hoveredButton = null"
              @click.prevent="isInWishlist ? removeFromWishlist() : addToWishlist()"
              class="w-10 h-10 bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition relative"
            >
              <template v-if="isWishlistLoading">
                <svg class="w-4 h-4 animate-spin text-gray-600" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" class="opacity-25"></circle>
                  <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" stroke-width="3" class="opacity-75"></path>
                </svg>
              </template>
              <template v-else>
                <svg v-if="!isInWishlist" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </template>
            </button>
            <div v-if="hoveredButton === 'wishlist'" class="tooltip">Add To Wishlist</div>
            <div v-if="hoveredButton === 'remove'" class="tooltip">Remove</div>
          </div>

          <div class="relative">
            <button
              @mouseenter="hoveredButton = 'compare'"
              @mouseleave="hoveredButton = null"
              @click.prevent="compare"
              class="w-10 h-10 bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
            <div v-if="hoveredButton === 'compare'" class="tooltip">Compare</div>
          </div>

          <div class="relative">
            <button
              @mouseenter="hoveredButton = 'quickview'"
              @mouseleave="hoveredButton = null"
              @click.prevent="quickView"
              class="w-10 h-10 bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <div v-if="hoveredButton === 'quickview'" class="tooltip">Quick View</div>
          </div>
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
import useWishlistStore from '@/stores/wishlist'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import authService from '@/services/authService'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const isHovered = ref(false)
const hoveredButton = ref(null)

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

const router = useRouter()
const toast = useToast()

const addToCart = async () => {
  try {
    if (!authService.isLoggedIn()) {
      toast.info('Please login to add items to your cart')
      router.push({ name: 'login', query: { redirect: `/product/${props.product.id}` } })
      return
    }
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

const wishlist = useWishlistStore()

const normalize = (v) => (v === undefined || v === null) ? null : String(v)

const matchesId = (item, id) => {
  const sid = normalize(id)
  if (!item) return false
  const candidates = [item.id, item.product_id]
  if (item.product && item.product.id) candidates.push(item.product.id)
  return candidates.some(x => normalize(x) === sid)
}

const isInWishlist = computed(() => {
  return wishlist.items.some(i => matchesId(i, props.product.id))
})

const isWishlistLoading = computed(() => {
  return Array.isArray(wishlist.loadingIds) && wishlist.loadingIds.some(id => normalize(id) === normalize(props.product.id))
})

const addToWishlist = async () => {
  try {
    if (!authService.isLoggedIn()) {
      toast.info('Please login to add items to your wishlist')
      router.push({ name: 'login', query: { redirect: `/product/${props.product.id}` } })
      return
    }
    await wishlist.addToWishlist(props.product.id)
  } catch (e) {
    console.error('Failed to add to wishlist', e)
  }
}

const removeFromWishlist = async () => {
  try {
    await wishlist.removeFromWishlist(props.product.id)
  } catch (e) {
    console.error('Failed to remove from wishlist', e)
  }
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

.tooltip {
  position: absolute;
  right: 3.25rem; /* place left of buttons */
  top: 0;
  background: #2d2d2d;
  color: #fff;
  padding: 0.5rem 0.9rem;
  border-radius: 6px;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 20;
  box-shadow: 0 8px 22px rgba(0,0,0,0.18);
}
.tooltip::after {
  content: '';
  position: absolute;
  right: -6px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: #2d2d2d;
}
</style>
