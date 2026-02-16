<template>
  <header class="border-b sticky top-0 bg-white z-50">
    <div class="max-w-[1400px] mx-auto px-6 h-[90px] flex items-center justify-between">
      <!-- LOGO -->
      <h1 class="text-[26px] font-medium tracking-widest">LEZADA</h1>

      <!-- NAV -->
      <nav class="hidden lg:flex items-center gap-10 text-sm">
        <template v-for="item in menu" :key="item">
          <div
            v-if="item === 'Catalog'"
            class="relative"
            @mouseenter="handleCatalogMouseEnter"
            @mouseleave="handleCatalogMouseLeave"
          >
            <a href="#" class="hover:text-black flex items-center gap-1">
              {{ item }}
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </a>
          </div>
          <div
            v-else-if="item === 'Blog'"
            class="relative"
            @mouseenter="handleBlogMouseEnter"
            @mouseleave="handleBlogMouseLeave"
          >
            <a href="#" class="hover:text-black flex items-center gap-1 pb-0.5">
              {{ item }}
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </a>
            <!-- Blog Dropdown -->
            <div
              v-if="showBlogDropdown"
              class="blog-dropdown absolute top-full left-0 mt-4 w-56 bg-white  shadow-lg z-50"
              @mouseenter="handleBlogMouseEnter"
              @mouseleave="handleBlogMouseLeave"
            >
              <ul class="py-2">
                <li
                  v-for="layout in blogLayouts"
                  :key="layout.name"
                  class="relative group/item"
                  @mouseenter="activeBlogSubmenu = layout.name"
                  @mouseleave="activeBlogSubmenu = null"
                >
                  <a href="#" class="flex items-center justify-between px-5 py-3 text-gray-600 hover:text-black hover:bg-gray-50 transition">
                    {{ layout.name }}
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                  <!-- Nested Submenu -->
                  <div
                    v-if="activeBlogSubmenu === layout.name"
                    class="absolute left-full top-0 w-48 bg-white shadow-lg"
                  >
                    <ul class="py-2">
                      <li>
                        <a href="#" class="flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-black hover:bg-gray-50 transition">
                          Left Sidebar
                          <span class="bg-[#7fc7b2] text-white text-[9px] px-1.5 py-0.5 rounded">New</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" class="block px-5 py-3 text-gray-600 hover:text-black hover:bg-gray-50 transition">
                          Right Sidebar
                        </a>
                      </li>
                      <li>
                        <a href="#" class="block px-5 py-3 text-gray-600 hover:text-black hover:bg-gray-50 transition">
                          Full Width
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div
            v-else-if="item === 'Pages'"
            class="relative"
            @mouseenter="handlePagesMouseEnter"
            @mouseleave="handlePagesMouseLeave"
          >
            <a href="#" class="hover:text-black flex items-center gap-1">
              {{ item }}
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </a>
            <!-- Pages Dropdown -->
            <div
              v-if="showPagesDropdown"
              class="pages-dropdown absolute top-full right-0 mt-4 w-48 bg-white shadow-lg z-50"
              @mouseenter="handlePagesMouseEnter"
              @mouseleave="handlePagesMouseLeave"
            >
              <ul class="py-2">
                <li v-for="page in pagesMenu" :key="page.name">
                  <a href="#" class="flex items-center gap-2 px-5 py-3 text-gray-600 hover:text-black hover:bg-gray-50 transition">
                    {{ page.name }}
                    <span v-if="page.badge" class="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded uppercase">{{ page.badge }}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <RouterLink
            v-else-if="item === 'Home'"
            :to="{ name: 'home' }"
            class="hover:text-black"
          >
            {{ item }}
          </RouterLink>
          <RouterLink
            v-else-if="item === 'Shop'"
            :to="{ name: 'shop' }"
            class="hover:text-black"
          >
            {{ item }}
          </RouterLink>
          <a v-else href="#" class="hover:text-black">
            {{ item }}
          </a>
        </template>
      </nav>

      <!-- ICONS -->
      <div class="flex items-center gap-6 text-lg">
        <i class="ri-search-line cursor-pointer hover:text-gray-600 transition"></i>
        <RouterLink :to="{ name: 'login' }" class="hover:text-gray-600 transition">
          <i class="ri-user-line"></i>
        </RouterLink>
        <RouterLink :to="{ name: 'wishlist' }" class="hover:text-gray-600 transition">
          <i class="ri-heart-line"></i>
        </RouterLink>
        <div class="relative cursor-pointer hover:text-gray-600 transition" @click="showCartSidebar = true">
          <i class="ri-shopping-bag-line"></i>
          <span
            class="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full"
          >
            {{ cartItems.length }}
          </span>
        </div>
      </div>
    </div>

    <!-- CART SIDEBAR OVERLAY -->
    <div
      v-if="showCartSidebar"
      class="fixed inset-0 bg-black/40 z-[100]"
      @click="showCartSidebar = false"
    ></div>

    <!-- CART SIDEBAR -->
    <Transition name="slide">
      <div
        v-if="showCartSidebar"
        class="fixed top-0 right-0 h-full w-[380px] bg-white z-[101] shadow-2xl flex flex-col"
      >
        <!-- Cart Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b">
          <h2 class="text-lg font-medium text-gray-800">Cart</h2>
          <button @click="showCartSidebar = false" class="text-gray-400 hover:text-gray-600 transition">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto px-6 py-4">
          <div v-for="(item, index) in cartItems" :key="index" class="flex gap-4 py-4 border-b last:border-b-0">
            <!-- Product Image -->
            <div class="w-20 h-20 bg-gray-100 flex-shrink-0">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
            </div>
            
            <!-- Product Details -->
            <div class="flex-1">
              <div class="flex justify-between items-start">
                <h3 class="text-sm text-gray-800 pr-4">{{ item.id }}. {{ item.name }}</h3>
                <button @click="removeFromCart(index)" class="text-gray-400 hover:text-gray-600 transition">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <p class="text-sm text-gray-500 mt-1">
                {{ item.quantity }} x <span class="text-[#c9a96e]">${{ item.price.toFixed(2) }}</span>
              </p>
            </div>
          </div>

          <!-- Empty Cart Message -->
          <div v-if="cartItems.length === 0" class="text-center py-10 text-gray-500">
            Your cart is empty
          </div>
        </div>

        <!-- Cart Footer -->
        <div class="border-t px-6 py-5">
          <!-- Total -->
          <div class="flex justify-between items-center mb-5">
            <span class="text-gray-800 font-medium">Total:</span>
            <span class="text-gray-800 font-semibold">${{ cartTotal.toFixed(2) }}</span>
          </div>

          <!-- Terms Checkbox -->
          <label class="flex items-center gap-2 mb-5 cursor-pointer">
            <input type="checkbox" v-model="agreeTerms" class="w-4 h-4 accent-[#c9a96e]" />
            <span class="text-sm text-gray-600">I agree with the terms and conditions</span>
          </label>

          <!-- Buttons -->
          <div class="space-y-3">
            <button
              class="w-full py-3.5 bg-[#f5a9a9] text-white text-sm uppercase tracking-wider hover:bg-[#e89999] transition"
              :class="{ 'opacity-50 cursor-not-allowed': !agreeTerms }"
              :disabled="!agreeTerms"
            >
              Checkout
            </button>
            <RouterLink
              :to="{ name: 'cart' }"
              @click="showCartSidebar = false"
              class="block w-full py-3.5 bg-[#3d3d3d] text-white text-sm uppercase tracking-wider hover:bg-black transition text-center"
            >
              View Cart
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>

    <!-- CATALOG DROPDOWN -->
    <div
      v-if="showCatalogDropdown"
      class="catalog-dropdown absolute top-full left-1/2 -translate-x-1/2 w-[70%] bg-white border-b shadow-lg z-50"
      @mouseenter="handleCatalogMouseEnter"
      @mouseleave="handleCatalogMouseLeave"
    >
      <div class="max-w-[1400px] mx-auto px-6 py-10">
        <div class="flex gap-16">
          <!-- Popular Column -->
          <div class="flex-1">
            <h3 class="text-sm font-semibold mb-4 text-gray-800">Popular</h3>
            <ul class="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" class="flex items-center gap-2 hover:text-black cursor-pointer transition">
                  Causal
                  <span class="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded">NEW</span>
                </a>
              </li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Exclusive</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Aligori</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Churidar</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Shalwar</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Jeans</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Dress</a></li>
            </ul>
          </div>

          <!-- Best Selling Column -->
          <div class="flex-1">
            <h3 class="text-sm font-semibold mb-4 text-gray-800">Best Selling</h3>
            <ul class="space-y-3 text-sm text-gray-600">
              <li><a href="#" class="hover:text-black cursor-pointer transition">Sandals</a></li>
              <li>
                <a href="#" class="flex items-center gap-2 hover:text-black cursor-pointer transition">
                  Bast shoe
                  <span class="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded">New</span>
                </a>
              </li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Blucher shoe</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Boat shoe</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Brogan</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Chelsea boot</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Brothel creeper</a></li>
            </ul>
          </div>

          <!-- New Product Column -->
          <div class="flex-1">
            <h3 class="text-sm font-semibold mb-4 text-gray-800">New Product</h3>
            <ul class="space-y-3 text-sm text-gray-600">
              <li><a href="#" class="hover:text-black cursor-pointer transition">Belt</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Wallets</a></li>
              <li>
                <a href="#" class="hover:text-black cursor-pointer transition">
                  Card Holders
                  <span class="block bg-[#7fc7b2] text-white text-[10px] px-2 py-0.5 rounded mt-1 w-fit">SALE</span>
                </a>
              </li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Bags</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Executive bag</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Cufflinks</a></li>
              <li><a href="#" class="hover:text-black cursor-pointer transition">Cap</a></li>
            </ul>
          </div>

          <!-- Featured Product -->
          <div class="w-[280px]">
            <a href="#" class="block group">
              <div class="bg-white aspect-square flex items-center justify-center p-8 mb-4 transition group-hover:opacity-90">
                <img
                  src="https://via.placeholder.com/200x200/9b59b6/ffffff?text=HERBIVORE+MOON+FRUIT"
                  alt="Organic Moon Fruit"
                  class="w-32 h-32 object-contain"
                />
              </div>
              <h4 class="text-sm font-medium mb-2 text-gray-800 group-hover:text-black transition">Organic Moon Fruit</h4>
              <div class="flex items-center gap-2">
                <span class="text-sm font-semibold text-gray-900">$39.00</span>
                <span class="text-sm text-gray-400 line-through">$60.00</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";

const menu = ["Home", "Shop", "Catalog", "Blog", "Pages"];
const showCatalogDropdown = ref(false);
const showBlogDropdown = ref(false);
const showPagesDropdown = ref(false);
const showCartSidebar = ref(false);
const activeBlogSubmenu = ref(null);
const agreeTerms = ref(false);
let catalogTimeout = null;
let blogTimeout = null;
let pagesTimeout = null;

// Sample cart items
const cartItems = ref([
  {
    id: 11,
    name: 'Video Side Ottoman',
    price: 39.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop'
  },
  {
    id: 10,
    name: 'High-waist Trousers - white',
    price: 19.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop'
  }
]);

const cartTotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const removeFromCart = (index) => {
  cartItems.value.splice(index, 1);
};

const blogLayouts = [
  { name: 'Standard Layout' },
  { name: 'Grid layout' },
  { name: 'List Layout' },
  { name: 'Masonry Layout' },
  { name: 'Single Post Layout' }
];

const pagesMenu = [
  { name: 'Brand', badge: 'NEW' },
  { name: 'About Us' },
  { name: 'About Us 2' },
  { name: 'Contact Us' },
  { name: 'Faq' },
  { name: 'Team' },
  { name: 'Icon Box' },
  { name: 'Mailchimp' },
  { name: 'Typography' },
  { name: '404' }
];

const handleCatalogMouseLeave = (event) => {
  // Check if we're moving to the dropdown
  const relatedTarget = event.relatedTarget;
  if (relatedTarget && relatedTarget.closest('.catalog-dropdown')) {
    return; // Don't close if moving to dropdown
  }
  // Add a small delay before closing to allow moving to dropdown
  catalogTimeout = setTimeout(() => {
    showCatalogDropdown.value = false;
  }, 150);
};

// Clear timeout if mouse re-enters
const handleCatalogMouseEnter = () => {
  if (catalogTimeout) {
    clearTimeout(catalogTimeout);
    catalogTimeout = null;
  }
  showCatalogDropdown.value = true;
};

const handleBlogMouseLeave = (event) => {
  const relatedTarget = event.relatedTarget;
  if (relatedTarget && relatedTarget.closest('.blog-dropdown')) {
    return;
  }
  blogTimeout = setTimeout(() => {
    showBlogDropdown.value = false;
    activeBlogSubmenu.value = null;
  }, 150);
};

const handleBlogMouseEnter = () => {
  if (blogTimeout) {
    clearTimeout(blogTimeout);
    blogTimeout = null;
  }
  showBlogDropdown.value = true;
};

const handlePagesMouseLeave = (event) => {
  const relatedTarget = event.relatedTarget;
  if (relatedTarget && relatedTarget.closest('.pages-dropdown')) {
    return;
  }
  pagesTimeout = setTimeout(() => {
    showPagesDropdown.value = false;
  }, 150);
};

const handlePagesMouseEnter = () => {
  if (pagesTimeout) {
    clearTimeout(pagesTimeout);
    pagesTimeout = null;
  }
  showPagesDropdown.value = true;
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
