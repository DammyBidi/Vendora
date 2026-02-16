<template>
  <div class="w-full bg-white text-gray-800">
    <!-- ================= HEADER / NAV ================= -->
    

    <!-- ================= HERO SLIDER ================= -->

    <!-- <section class="max-w-[1400px] mx-auto px-6 py-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(slide, i) in slides"
          :key="i"
          :class="slide.bg"
          class="relative h-[260px] flex items-center px-10"
        >
          <div>
            <p class="text-xs tracking-widest uppercase mb-2 text-gray-500">
              Accessories
            </p>
            <h2 class="text-2xl font-medium leading-tight mb-6">
              {{ slide.title }}
            </h2>
            <button
              class="px-7 py-2.5 border border-black text-xs uppercase hover:bg-black hover:text-white transition"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section> -->
    
    <HeroSlider />

    <!-- ================= PRODUCT TABS ================= -->
    <section class="max-w-[1400px] mx-auto px-6 py-16">
      <!-- TABS -->
      <div class="flex justify-center gap-12 mb-14 text-xl">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="activeTab === tab ? 'text-black' : 'text-gray-400'"
        >
          {{ tab }}
        </button>
      </div>

      <!-- GRID -->
      <div v-if="loading" class="text-center py-20 text-gray-500">
        Loading products...
      </div>
      <div v-else-if="error" class="text-center py-20 text-red-500">
        {{ error }}
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14"
      >
        <ProductCard v-for="p in filteredProducts" :key="p.id" :product="p" />
      </div>
    </section>

    <!-- ================= PROMO BANNER ================= -->
    <section class="text-center py-20 mt-20">
      <img
        src="https://lezada-demo.myshopify.com/cdn/shop/files/cabinet_922x.jpg?v=1613765140"
        class="mx-auto mb-10"
      />

      <p class="uppercase text-xs tracking-widest text-gray-400 mb-3">
        #summer #shelf #sale
      </p>

      <h2 class="text-2xl md:text-3xl mb-8">
        Up To 40% Off Final Sale Items. Caught in the moment!
      </h2>

      <button
        class="px-10 py-3 border border-black text-xs uppercase hover:bg-black hover:text-white transition"
      >
        Shop Now
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Header from "@/components/header.vue";
import HeroSlider from "@/components/HeroSlider.vue";
import ProductCard from "@/components/ProductCard.vue";
import { productService } from "@/services";

const tabs = ["New", "Popular", "Sale"];
const activeTab = ref("New");
const products = ref([]);
const loading = ref(false);
const error = ref("");

// Fetch products from API
const fetchProducts = async () => {
  loading.value = true;
  error.value = "";
  try {
    const { data } = await productService.getAll();
    products.value = data.data || [];
  } catch (err) {
    error.value = "Failed to load products";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

const filteredProducts = computed(() => {
  // For now, show all products since API doesn't have tags
  // You can add filtering logic based on your needs
  return products.value.slice(0, 6);
});
</script>
