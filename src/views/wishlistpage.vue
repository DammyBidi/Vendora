<template>
  <div class="w-full bg-white">
    <!-- Breadcrumb -->
    <div class="bg-[#f8f8f8] border-b py-4">
      <div class="max-w-[1400px] mx-auto px-6">
        <nav class="flex items-center gap-2 text-sm">
          <RouterLink to="/" class="text-[#c9a96e] hover:text-[#b89860]">Home</RouterLink>
          <span class="text-gray-400">/</span>
          <span class="text-gray-500">Wishlist</span>
        </nav>
      </div>
    </div>

    <!-- Wishlist Content -->
    <div class="max-w-[1400px] mx-auto px-6 py-12">
        <!-- Wishlist Grid (powered by ProductCard) -->
        <div v-if="!loading && wishlistItems.length === 0" class="text-center py-16">
          <i class="ri-heart-line text-6xl text-gray-300 mb-4"></i>
          <p class="text-gray-500 text-lg">Your wishlist is empty</p>
          <RouterLink 
            to="/shop" 
            class="inline-block mt-6 px-8 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition"
          >
            Continue Shopping
          </RouterLink>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProductCard
            v-for="item in wishlistItems"
            :key="item.id"
            :product="item"
          />
        </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import useWishlistStore from '@/stores/wishlist'

const wishlist = useWishlistStore()

onMounted(() => {
  wishlist.fetchWishlist().catch(() => {})
})

const loading = computed(() => wishlist.loading)
const wishlistItems = computed(() => wishlist.items)
</script>
