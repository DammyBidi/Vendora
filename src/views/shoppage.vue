<template>
  <div class="w-full bg-white text-gray-800">
    
  

    <!-- BREADCRUMBS -->
    <div class="border-b">
      <div class="max-w-[1400px] mx-auto px-6 py-4 text-sm">
        <div class="flex items-center gap-2 text-gray-600">
          <RouterLink :to="{ name: 'home' }" class="hover:text-black">Home</RouterLink>
          <span>/</span>
          <span class="text-black">Products</span>
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="max-w-[1400px] mx-auto px-6 py-8">
      <div class="flex gap-8">
        <!-- LEFT SIDEBAR FILTERS -->
        <aside class="hidden lg:block w-64 shrink-0">
          <!-- Custom Menu -->
          <div class="mb-6 pb-6 border-b">
            <h3 class="text-sm font-semibold mb-4 text-gray-800">Custom Menu</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>
                <RouterLink :to="{ name: 'home' }" class="hover:text-black">Home</RouterLink>
              </li>
              <li>
                <RouterLink :to="{ name: 'shop' }" class="hover:text-black">Shop</RouterLink>
              </li>
              <li>
                <a href="#" class="hover:text-black">Catalog <span class="text-red-500">SALE</span></a>
              </li>
              <li><a href="#" class="hover:text-black">Blog</a></li>
              <li><a href="#" class="hover:text-black">Pages</a></li>
            </ul>
          </div>

          <!-- Availability -->
          <div class="mb-6 pb-6 border-b">
            <h3 class="text-sm font-semibold mb-4 text-gray-800">Availability</h3>
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" />
                <span>In stock (48)</span>
              </label>
              <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" class="w-4 h-4" />
                <span>Out of stock (25)</span>
              </label>
            </div>
          </div>

          <!-- Price -->
          <div class="mb-6 pb-6 border-b">
            <h3 class="text-sm font-semibold mb-4 text-gray-800">Price</h3>
            <div class="flex gap-2 mb-3">
              <input
                type="number"
                placeholder="From"
                class="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
              />
              <input
                type="number"
                placeholder="To"
                class="w-full px-3 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
              />
            </div>
            <button class="w-full px-4 py-2 bg-black text-white text-xs uppercase hover:bg-gray-800 transition">
              Filter
            </button>
          </div>

          <!-- Color -->
          <div class="mb-6 pb-6 border-b">
            <h3 class="text-sm font-semibold mb-4 text-gray-800">Color</h3>
            <div class="space-y-2 max-h-64 overflow-y-auto">
              <label
                v-for="color in colors"
                :key="color.name"
                class="flex items-center justify-between text-sm text-gray-600 cursor-pointer hover:text-black"
              >
                <div class="flex items-center gap-2">
                  <input type="checkbox" class="w-4 h-4" />
                  <span>{{ color.name }}</span>
                </div>
                <span class="text-gray-400">({{ color.count }})</span>
              </label>
            </div>
          </div>

          <!-- Size -->
          <div class="mb-6 pb-6 border-b">
            <h3 class="text-sm font-semibold mb-4 text-gray-800">Size</h3>
            <div class="space-y-2">
              <label
                v-for="size in sizes"
                :key="size.name"
                class="flex items-center justify-between text-sm text-gray-600 cursor-pointer hover:text-black"
              >
                <div class="flex items-center gap-2">
                  <input type="checkbox" class="w-4 h-4" />
                  <span>{{ size.name }}</span>
                </div>
                <span class="text-gray-400">({{ size.count }})</span>
              </label>
            </div>
          </div>

          <!-- Product Type -->
          <div class="mb-6 pb-6 border-b">
            <h3 class="text-sm font-semibold mb-4 text-gray-800">Product type</h3>
            <div class="space-y-2">
              <label
                v-for="type in productTypes"
                :key="type.name"
                class="flex items-center justify-between text-sm text-gray-600 cursor-pointer hover:text-black"
              >
                <div class="flex items-center gap-2">
                  <input type="checkbox" class="w-4 h-4" />
                  <span>{{ type.name }}</span>
                </div>
                <span class="text-gray-400">({{ type.count }})</span>
              </label>
            </div>
          </div>

          <!-- Brand -->
          <div class="mb-6 pb-6 border-b">
            <h3 class="text-sm font-semibold mb-4 text-gray-800">Brand</h3>
            <div class="space-y-2">
              <label
                v-for="brand in brands"
                :key="brand.name"
                class="flex items-center justify-between text-sm text-gray-600 cursor-pointer hover:text-black"
              >
                <div class="flex items-center gap-2">
                  <input type="checkbox" class="w-4 h-4" />
                  <span>{{ brand.name }}</span>
                </div>
                <span class="text-gray-400">({{ brand.count }})</span>
              </label>
            </div>
          </div>

          <!-- Material -->
          <div class="mb-6">
            <h3 class="text-sm font-semibold mb-4 text-gray-800">Material</h3>
            <div class="space-y-2">
              <label
                v-for="material in materials"
                :key="material.name"
                class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-black"
              >
                <input type="checkbox" class="w-4 h-4" />
                <span>{{ material.name }}</span>
              </label>
            </div>
          </div>
        </aside>

        <!-- MAIN PRODUCT AREA -->
        <main class="flex-1">
          <!-- TOP BAR -->
          <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="text-sm text-gray-600">
              Showing <span class="font-semibold text-black">{{ startResult }}-{{ endResult }}</span> of
              <span class="font-semibold text-black">{{ totalResults }}</span> result
            </div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2 text-sm">
                <span class="text-gray-600">Show</span>
                <select
                  v-model="itemsPerPage"
                  class="px-3 py-1 border border-gray-300 text-sm focus:outline-none focus:border-black"
                >
                  <option v-for="num in [12, 24, 36, 48]" :key="num" :value="num">{{ num }}</option>
                </select>
                <span class="text-gray-600">per page</span>
              </div>
              <div class="flex items-center gap-2 text-sm">
                <span class="text-gray-600">Sort by:</span>
                <select
                  v-model="sortBy"
                  class="px-3 py-1 border border-gray-300 text-sm focus:outline-none focus:border-black"
                >
                  <option value="featured">Featured</option>
                  <option value="bestselling">Best Selling</option>
                  <option value="az">Alphabetically, A-Z</option>
                  <option value="za">Alphabetically, Z-A</option>
                  <option value="lowhigh">Price, low to high</option>
                  <option value="highlow">Price, high to low</option>
                  <option value="newold">Date, new to old</option>
                  <option value="oldnew">Date, old to new</option>
                </select>
              </div>
            </div>
          </div>

          <!-- PRODUCT GRID -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
          </div>

          <!-- PAGINATION -->
          <div class="flex items-center justify-center gap-2 mt-8">
            <button
              @click="currentPage > 1 && currentPage--"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-300 text-sm hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-4 py-2 border text-sm transition',
                currentPage === page
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 hover:bg-gray-100'
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="currentPage < totalPages && currentPage++"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border border-gray-300 text-sm hover:bg-black hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>

    <!-- FOOTER -->
    <footer class="border-t mt-24 py-16">
      <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        <div>
          <h3 class="font-semibold mb-4">Lezada</h3>
          <p class="text-gray-500">© 2018 Lezada. All Rights Reserved.</p>
        </div>

        <div>
          <h4 class="font-semibold mb-3">Company</h4>
          <ul class="space-y-2 text-gray-500">
            <li>About Us</li>
            <li>Contact</li>
            <li>Policy</li>
            <li>FAQs</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold mb-3">Contact</h4>
          <p class="text-gray-500">
            (+00) 123 567 990<br />
            contact@vedora.com
          </p>
        </div>

        <div>
          <h4 class="font-semibold mb-3">Payment</h4>
          <div class="flex gap-2">
            <div class="w-10 h-6 bg-gray-200"></div>
            <div class="w-10 h-6 bg-gray-200"></div>
            <div class="w-10 h-6 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { RouterLink } from "vue-router";
import Header from "@/components/header.vue";
import ProductCard from "@/components/ProductCard.vue";
import { productService } from '@/services'

// Filter data
const colors = [
  { name: "black", count: 12 },
  { name: "blue", count: 18 },
  { name: "dark wood", count: 1 },
  { name: "darkred", count: 1 },
  { name: "gold", count: 10 },
  { name: "gray", count: 11 },
  { name: "green", count: 17 },
  { name: "grey", count: 2 },
  { name: "honeydew", count: 1 },
  { name: "ivory", count: 1 },
  { name: "light wood", count: 1 },
  { name: "magenta", count: 5 },
  { name: "maroon", count: 5 },
  { name: "navy", count: 5 },
  { name: "orange", count: 3 },
  { name: "pink", count: 5 },
  { name: "purple", count: 5 },
  { name: "red", count: 17 },
  { name: "violet", count: 5 },
  { name: "white", count: 16 },
  { name: "yellow", count: 10 }
];

const sizes = [
  { name: "s", count: 17 },
  { name: "m", count: 21 },
  { name: "l", count: 18 },
  { name: "xl", count: 17 },
  { name: "xxl", count: 9 },
  { name: "xxxl", count: 4 },
  { name: "x", count: 7 }
];

const productTypes = [
  { name: "Type 1", count: 5 },
  { name: "Type 2", count: 3 },
  { name: "Type 3", count: 5 },
  { name: "Type 4", count: 6 },
  { name: "Type 5", count: 5 },
  { name: "Type 6", count: 6 },
  { name: "Type 7", count: 5 },
  { name: "Type 8", count: 9 },
  { name: "Type 9", count: 2 },
  { name: "Type 10", count: 3 },
  { name: "Type 11", count: 4 }
];

const brands = [
  { name: "Lezada - Multipurpose eCommerce Shopify Theme", count: 1 },
  { name: "Vendor 1", count: 5 },
  { name: "Vendor 2", count: 3 },
  { name: "Vendor 3", count: 5 },
  { name: "Vendor 4", count: 6 },
  { name: "Vendor 5", count: 5 },
  { name: "Vendor 6", count: 6 },
  { name: "Vendor 7", count: 5 },
  { name: "Vendor 8", count: 9 },
  { name: "Vendor 9", count: 2 },
  { name: "Vendor 10", count: 3 },
  { name: "Vendor 11", count: 4 }
];

const materials = [
  { name: "fiber" },
  { name: "leather" },
  { name: "metal" },
  { name: "resin" },
  { name: "slag" }
];

// Products data (loaded from API)
const products = ref([])
const loading = ref(false)
const error = ref('')

// Pagination controls (client-driven inputs)
const currentPage = ref(1);
const itemsPerPage = ref(12);
const sortBy = ref("featured");

// server pagination state
const from = ref(0)
const to = ref(0)
const totalResults = ref(0)
const totalPages = ref(1)

const fetchProducts = async () => {
  loading.value = true
  error.value = ''
  try {
    const res = await productService.getAll({ page: currentPage.value, per_page: itemsPerPage.value })
    const payload = res.data || {}
    const list = payload.data || []
    products.value = list.map(p => ({
      id: p.id,
      name: p.name,
      price: parseFloat(p.price) || 0,
      oldPrice: p.originalPrice ? parseFloat(p.originalPrice) : p.oldPrice || null,
      sale: !!p.sale,
      salePercent: p.salePercent || 0,
      sizes: p.sizes || [],
      soldout: p.stock === 0,
      image: p.image || p.hover_image || '',
    }))

    // pagination meta from API
    totalResults.value = payload.total ?? totalResults.value
    totalPages.value = payload.last_page ?? totalPages.value
    from.value = payload.from ?? 0
    to.value = payload.to ?? products.value.length
  } catch (e) {
    console.error('Failed to load products', e)
    error.value = 'Failed to load products'
  } finally {
    loading.value = false
  }
}

// refetch when page or per-page changes
watch([() => currentPage.value, () => itemsPerPage.value], () => {
  fetchProducts()
}, { immediate: true })

// reset to first page when itemsPerPage changes
watch(itemsPerPage, () => { currentPage.value = 1 })

// Pagination (UI computed values using server state)
const startResult = computed(() => from.value || ((currentPage.value - 1) * itemsPerPage.value + 1));
const endResult = computed(() => to.value || Math.min(currentPage.value * itemsPerPage.value, totalResults.value));

const visiblePages = computed(() => {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages.value, start + maxVisible - 1);
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  return pages;
});

const paginatedProducts = computed(() => products.value);
</script>
