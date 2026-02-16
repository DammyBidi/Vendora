<template>
  <div class="w-full bg-white text-gray-800">

    <!-- Breadcrumb -->
    <div class="bg-[#f8f8f8] border-b">
      <div class="max-w-[1400px] mx-auto px-6 py-4">
        <nav class="flex items-center gap-2 text-sm">
          <RouterLink to="/" class="text-[#c9a96e] hover:text-[#b89860]">Home</RouterLink>
          <span class="text-gray-400">/</span>
          <span class="text-gray-500">{{ product.name }}</span>
        </nav>
      </div>
    </div>

    <!-- Main Product -->
    <div class="max-w-[1400px] mx-auto px-6 py-12">
      <div v-if="loading" class="text-center py-20 text-gray-500">Loading product...</div>
      <div v-else-if="error" class="text-center py-20 text-red-500">{{ error }}</div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Left: Image -->
        <div>
          <div class="bg-[#f5f5f5] aspect-square flex items-center justify-center relative">
            <!-- Zoom Icon -->
            <button class="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition z-10">
              <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
              </svg>
            </button>
            <img
              :src="selectedImage"
              class="max-w-full max-h-full object-contain p-8"
            />
          </div>

          <!-- Thumbnails -->
          <div class="flex gap-3 mt-4">
            <div
              v-for="(img, i) in thumbnails"
              :key="i"
              @click="selectedImage = img"
              class="w-20 h-20 bg-[#f5f5f5] flex items-center justify-center cursor-pointer border-2 transition"
              :class="selectedImage === img ? 'border-gray-400' : 'border-transparent hover:border-gray-300'"
            >
              <img :src="img" class="object-contain max-h-full p-1" />
            </div>
          </div>
        </div>

        <!-- Right: Info -->
        <div class="space-y-5">
          <h1 class="text-2xl text-gray-800">{{ product.name }}</h1>

          <p class="text-sm text-gray-600">
            Availability:
            <span class="text-green-600 font-medium">{{ product.stock }} In Stock</span>
          </p>

          <!-- Price -->
          <div class="flex items-center gap-3">
            <span class="text-gray-400 line-through text-lg">${{ product.originalPrice.toFixed(2) }}</span>
            <span class="text-xl font-medium text-gray-800">${{ product.price.toFixed(2) }}</span>
            <span class="bg-[#3d3d3d] text-white text-xs px-2 py-1 rounded">Save -{{ product.discount }}%</span>
          </div>

          <!-- Shipping Links -->
          <div class="flex items-center gap-6 text-sm text-gray-500 border-b pb-5">
            <a href="#" class="flex items-center gap-1 hover:text-black">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/>
              </svg>
              Shipping
            </a>
            <a href="#" class="flex items-center gap-1 hover:text-black">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Ask About This Product
            </a>
          </div>

          <!-- Size -->
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-600 w-16">Size :</span>
            <div class="flex gap-2">
              <button 
                v-for="size in sizes" 
                :key="size"
                @click="selectedSize = size"
                class="w-10 h-10 border text-sm flex items-center justify-center transition"
                :class="selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-500'"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <!-- Color -->
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-600 w-16">Color :</span>
            <div class="flex gap-2">
              <button 
                v-for="color in colors" 
                :key="color.name"
                @click="selectedColor = color.name"
                class="w-6 h-6 rounded-full border-2 transition"
                :style="{ backgroundColor: color.hex }"
                :class="selectedColor === color.name ? 'border-gray-800 ring-2 ring-offset-1 ring-gray-400' : 'border-gray-300'"
              ></button>
            </div>
          </div>

          <!-- Quantity -->
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-600 w-16">Quantity:</span>
            <div class="flex items-center border border-gray-300">
              <button @click="decreaseQty" class="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition">−</button>
              <input :value="quantity" class="w-12 h-10 text-center border-x border-gray-300 outline-none text-gray-700" readonly />
              <button @click="increaseQty" class="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition">+</button>
            </div>
          </div>

          <!-- Add to Cart + Wishlist -->
          <div class="flex gap-3 pt-2">
            <button class="flex-1 bg-[#3d3d3d] text-white py-3.5 text-xs uppercase tracking-wider hover:bg-black transition">
              Add to Cart
            </button>
            <button class="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-gray-500 transition">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>

          <!-- Terms -->
          <label class="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">
            <input type="checkbox" v-model="agreeTerms" class="w-4 h-4" />
            I agree with the terms and conditions
          </label>

          <!-- Buy It Now -->
          <button 
            class="w-full bg-[#f5e6a3] py-3.5 text-xs uppercase tracking-wider hover:bg-[#e8d896] transition"
            :class="{ 'opacity-50 cursor-not-allowed': !agreeTerms }"
            :disabled="!agreeTerms"
          >
            Buy It Now
          </button>

          <!-- Guaranteed Safe Checkout -->
          <div class="pt-4">
            <p class="text-sm text-gray-600 mb-3">Guaranteed safe checkout</p>
            <div class="flex gap-2">
              <!-- Visa -->
              <div class="h-8 px-2 border border-gray-200 flex items-center justify-center rounded">
                <svg class="h-5" viewBox="0 0 48 16" fill="none">
                  <path d="M19.5 1L16.5 15H13L16 1H19.5Z" fill="#1A1F71"/>
                  <path d="M32 1L28.5 15H25L28.5 1H32Z" fill="#1A1F71"/>
                  <path d="M11.5 1L7 10.5L6.5 8L5 2C5 2 4.8 1 3.5 1H0L0 1.2C0 1.2 1.5 1.5 3 2.5L6 15H9.5L15 1H11.5Z" fill="#1A1F71"/>
                  <path d="M38 1C37 1 36.5 1.5 36 2.5L30.5 15H34L34.8 12.5H39L39.5 15H43L40 1H38ZM35.8 10L37.5 4.5L38.5 10H35.8Z" fill="#1A1F71"/>
                </svg>
              </div>
              <!-- Mastercard -->
              <div class="h-8 px-2 border border-gray-200 flex items-center justify-center rounded">
                <svg class="h-5" viewBox="0 0 32 20" fill="none">
                  <circle cx="11" cy="10" r="8" fill="#EB001B"/>
                  <circle cx="21" cy="10" r="8" fill="#F79E1B"/>
                  <path d="M16 4C17.8 5.5 19 7.6 19 10C19 12.4 17.8 14.5 16 16C14.2 14.5 13 12.4 13 10C13 7.6 14.2 5.5 16 4Z" fill="#FF5F00"/>
                </svg>
              </div>
              <!-- Amex -->
              <div class="h-8 px-2 border border-gray-200 flex items-center justify-center rounded">
                <svg class="h-5" viewBox="0 0 40 14" fill="none">
                  <rect width="40" height="14" rx="2" fill="#016FD0"/>
                  <text x="20" y="10" font-size="7" fill="white" text-anchor="middle" font-weight="bold">AMEX</text>
                </svg>
              </div>
              <!-- PayPal -->
              <div class="h-8 px-2 border border-gray-200 flex items-center justify-center rounded">
                <svg class="h-5" viewBox="0 0 40 14" fill="none">
                  <text x="2" y="11" font-size="9" fill="#003087" font-weight="bold">Pay</text>
                  <text x="20" y="11" font-size="9" fill="#009CDE" font-weight="bold">Pal</text>
                </svg>
              </div>
            </div>
          </div>

          <!-- Meta -->
          <div class="text-sm text-gray-500 space-y-2 pt-4 border-t">
            <p class="pt-4"><span class="text-gray-700">SKU:</span> {{ product.sku }}</p>
            <p><span class="text-gray-700">Vendor:</span> {{ product.vendor }}</p>
            <p><span class="text-gray-700">Type:</span> {{ product.type }}</p>
          </div>

          <!-- Share -->
          <div class="flex items-center gap-4">
            <span class="text-sm text-gray-700">Share:</span>
            <div class="flex gap-2">
              <a href="#" class="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-80 transition">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" class="w-8 h-8 rounded-full bg-[#1da1f2] flex items-center justify-center text-white hover:opacity-80 transition">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" class="w-8 h-8 rounded-full bg-[#bd081c] flex items-center justify-center text-white hover:opacity-80 transition">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

        <!-- Tabs -->
      <div class="mt-20">
        <div class="flex justify-center gap-10 border-b">
          <button 
            @click="activeTab = 'description'"
            class="pb-4 text-lg transition"
            :class="activeTab === 'description' ? 'text-gray-800 border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'"
          >
            Description
          </button>
          <button 
            @click="activeTab = 'review'"
            class="pb-4 text-lg transition"
            :class="activeTab === 'review' ? 'text-gray-800 border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'"
          >
            Review
          </button>
          <button 
            @click="activeTab = 'custom'"
            class="pb-4 text-lg transition"
            :class="activeTab === 'custom' ? 'text-gray-800 border-b-2 border-black' : 'text-gray-400 hover:text-gray-600'"
          >
            Custom Tab
          </button>
        </div>

        <div class="max-w-4xl mx-auto text-sm text-gray-500 leading-relaxed mt-10 space-y-6">
          <p>
            Contrary to popular belief, Lorem ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </p>
          <p>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </p>
          <p class="text-gray-400 text-xs">[new_products][/0][new_products] [short_description]</p>
          <p>
            Contrary to popular belief, Lorem ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.
          </p>
          <p class="text-gray-400 text-xs">[short_description] [product_description]</p>
          <p>
            Contrary to popular belief, Lorem ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
          </p>
          <p>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </p>
          <p class="text-gray-400 text-xs">[product_description]</p>
        </div>
      </div>

      <!-- Related Products -->
      <section class="mt-24">
        <h2 class="text-center text-2xl text-gray-800 mb-10">Related Product</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="product in relatedProducts" :key="product.id" class="group">
            <div class="bg-[#f5f5f5] aspect-square flex items-center justify-center mb-4 relative overflow-hidden">
              <img :src="product.image" :alt="product.name" class="max-h-full object-contain p-4 group-hover:scale-105 transition duration-300" />
            </div>
            <h4 class="text-sm text-gray-700 mb-1">{{ product.name }}</h4>
            <div class="flex items-center gap-2">
              <span v-if="product.originalPrice" class="text-[#c9a96e] text-sm">${{ product.price.toFixed(2) }}</span>
              <span v-if="product.originalPrice" class="text-gray-400 text-sm line-through">${{ product.originalPrice.toFixed(2) }}</span>
              <span v-else class="text-gray-700 text-sm">${{ product.price.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Recommended Products -->
      <section class="mt-24">
        <h2 class="text-center text-2xl text-gray-800 mb-10">Recommended Product</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="product in recommendedProducts" :key="product.id" class="group">
            <div class="bg-[#f5f5f5] aspect-square flex items-center justify-center mb-4 relative overflow-hidden">
              <img :src="product.image" :alt="product.name" class="max-h-full object-contain p-4 group-hover:scale-105 transition duration-300" />
            </div>
            <h4 class="text-sm text-gray-700 mb-1">{{ product.name }}</h4>
            <div class="flex items-center gap-2">
              <span v-if="product.originalPrice" class="text-[#c9a96e] text-sm">${{ product.price.toFixed(2) }}</span>
              <span v-if="product.originalPrice" class="text-gray-400 text-sm line-through">${{ product.originalPrice.toFixed(2) }}</span>
              <span v-else class="text-gray-700 text-sm">${{ product.price.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Recently Viewed Products -->
      <section class="mt-24 mb-16">
        <h2 class="text-center text-2xl text-gray-800 mb-10">Recently Viewed Products</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="product in recentlyViewed" :key="product.id" class="group">
            <div class="bg-[#f5f5f5] aspect-square flex items-center justify-center mb-4 relative overflow-hidden">
              <img :src="product.image" :alt="product.name" class="max-h-full object-contain p-4 group-hover:scale-105 transition duration-300" />
            </div>
            <h4 class="text-sm text-gray-700 mb-1 text-center">{{ product.name }}</h4>
            <div class="text-center mb-3">
              <span v-if="product.originalPrice" class="text-gray-700 text-sm">${{ product.price.toFixed(2) }} USD </span>
              <span v-if="product.originalPrice" class="text-gray-400 text-sm line-through">${{ product.originalPrice.toFixed(2) }} USD</span>
              <span v-else class="text-gray-700 text-sm">${{ product.price.toFixed(2) }} USD</span>
            </div>
            <button 
              class="w-full py-3 text-xs uppercase tracking-wider transition border"
              :class="product.hasOptions ? 'bg-[#c9a96e] text-white border-[#c9a96e] hover:bg-[#b89860]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'"
            >
              {{ product.hasOptions ? 'Select Options' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router'
import { productService } from '@/services'

const route = useRoute()
const product = ref({
  id: null,
  name: '',
  description: '',
  price: 0,
  originalPrice: 0,
  discount: 0,
  stock: 0,
  sku: '',
  vendor: '',
  type: '',
  image: '',
})

const thumbnails = ref([])
const selectedImage = ref('')

const sizes = ['S', 'M', 'L', 'XL']
const selectedSize = ref('S')

const colors = [
  { name: 'black', hex: '#1a1a1a' },
  { name: 'gray', hex: '#6b7280' },
  { name: 'brown', hex: '#8b5a2b' },
  { name: 'beige', hex: '#d4b896' },
  { name: 'navy', hex: '#1e3a5f' },
]
const selectedColor = ref('black')

const quantity = ref(1)
const agreeTerms = ref(false)
const activeTab = ref('description')
const loading = ref(false)
const error = ref('')

const increaseQty = () => { quantity.value++ }
const decreaseQty = () => { if (quantity.value > 1) quantity.value-- }

const fetchProduct = async (id) => {
  loading.value = true
  error.value = ''
  try {
    const res = await productService.getById(id)
    const data = res.data?.data || res.data
    // map backend fields to local product structure with sensible defaults
    product.value = {
      id: data.id,
      name: data.name || '',
      description: data.description || '',
      price: parseFloat(data.price) || 0,
      originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : (parseFloat(data.price) || 0),
      discount: data.discount || 0,
      stock: data.stock || 0,
      sku: data.sku || data.id || '',
      vendor: data.vendor || '',
      type: data.type || data.category || '',
      image: data.image || '',
    }

    // thumbnails: include hover image when available
    thumbnails.value = [data.image].filter(Boolean)
    if (data.hover_image) thumbnails.value.push(data.hover_image)
    selectedImage.value = thumbnails.value[0] || ''

    // fetch related products by category (exclude current product)
    try {
      if (data.category) {
        const relRes = await productService.getByCategory(data.category)
        const relList = relRes.data?.data || relRes.data || []
        relatedProducts.value = relList
          .filter(p => p.id !== data.id)
          .slice(0, 8)
          .map(p => ({
            id: p.id,
            name: p.name,
            price: parseFloat(p.price) || 0,
            originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
            image: p.image || p.hover_image || '',
          }))
      }
    } catch (e) {
      console.error('Failed to load related products', e)
    }

    // fetch recommended / featured products
    try {
      const recRes = await productService.getFeatured()
      const recList = recRes.data?.data || recRes.data || []
      recommendedProducts.value = recList
        .filter(p => p.id !== data.id)
        .slice(0, 8)
        .map(p => ({
          id: p.id,
          name: p.name,
          price: parseFloat(p.price) || 0,
          originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
          image: p.image || p.hover_image || '',
        }))
    } catch (e) {
      console.error('Failed to load recommended products', e)
    }

    // save this product to recently viewed in localStorage
    try {
      const raw = localStorage.getItem('recentlyViewed')
      const rv = raw ? JSON.parse(raw) : []
      const entry = {
        id: data.id,
        name: data.name || '',
        price: parseFloat(data.price) || 0,
        originalPrice: data.originalPrice ? parseFloat(data.originalPrice) : null,
        image: data.image || data.hover_image || '',
        hasOptions: data.hasOptions || false,
      }
      // remove any existing entry for this product
      const filtered = Array.isArray(rv) ? rv.filter(item => item.id !== entry.id) : []
      filtered.unshift(entry)
      const trimmed = filtered.slice(0, 8)
      localStorage.setItem('recentlyViewed', JSON.stringify(trimmed))
      recentlyViewed.value = trimmed
    } catch (e) {
      console.error('Failed to save recently viewed', e)
    }
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load product'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const id = route.params.id
  if (id) fetchProduct(id)
})

// Placeholder product lists (kept as in original file)
const relatedProducts = ref([])
const recommendedProducts = ref([])
const recentlyViewed = ref([])
</script>
