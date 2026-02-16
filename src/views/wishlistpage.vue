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
      <!-- Empty Wishlist -->
      <div v-if="wishlistItems.length === 0" class="text-center py-16">
        <i class="ri-heart-line text-6xl text-gray-300 mb-4"></i>
        <p class="text-gray-500 text-lg">Your wishlist is empty</p>
        <RouterLink 
          to="/shop" 
          class="inline-block mt-6 px-8 py-3 bg-black text-white text-sm uppercase tracking-wider hover:bg-gray-800 transition"
        >
          Continue Shopping
        </RouterLink>
      </div>

      <!-- Wishlist Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="item in wishlistItems" 
          :key="item.id" 
          class="group"
        >
          <!-- Product Image -->
          <div class="relative bg-[#f5f5f5] aspect-square mb-4 overflow-hidden">
            <img 
              :src="item.image" 
              :alt="item.name" 
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <!-- Remove Button -->
            <button 
              @click="removeFromWishlist(item.id)"
              class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
            >
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Product Info -->
          <div>
            <h3 class="text-gray-700 text-sm mb-2">{{ item.id }}. {{ item.name }}</h3>
            <div class="flex items-center gap-2">
              <span class="text-gray-800 font-medium">${{ item.price.toFixed(2) }}</span>
              <span v-if="item.oldPrice" class="text-gray-400 line-through text-sm">${{ item.oldPrice.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// Sample wishlist items
const wishlistItems = ref([
  {
    id: 10,
    name: "High-waist Trousers",
    price: 19.00,
    oldPrice: 21.00,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop"
  },
  {
    id: 1,
    name: "Side Ottoman",
    price: 110.00,
    oldPrice: 130.00,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop"
  },
  {
    id: 9,
    name: "Orginal Candle Cap",
    price: 79.00,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=500&fit=crop"
  },
  {
    id: 5,
    name: "Dining Chair variant",
    price: 50.00,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=500&fit=crop"
  }
]);

const removeFromWishlist = (id) => {
  wishlistItems.value = wishlistItems.value.filter(item => item.id !== id);
};
</script>
