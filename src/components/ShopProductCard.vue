<template>
  <RouterLink :to="{ name: 'productdetail', params: { id: product.id } }" class="group block">
    <div class="relative bg-[#f7f7f7] aspect-[4/5] overflow-hidden">
      <!-- SALE BADGE with percentage -->
      <span
        v-if="product.sale && !product.soldout"
        class="absolute top-4 left-4 bg-[#7fc7b2] text-white text-[11px] px-3 py-1 rounded-full font-semibold"
      >
        Sale -{{ product.salePercent }}%
      </span>

      <!-- SOLDOUT BADGE -->
      <span
        v-if="product.soldout"
        class="absolute top-4 left-4 bg-red-500 text-white text-[11px] px-3 py-1 rounded-full font-semibold"
      >
        SOLDOUT
      </span>

      <img
        :src="product.image"
        class="absolute inset-0 w-full h-full object-contain p-10 transition-transform duration-500 group-hover:scale-110"
        :class="{ 'opacity-50': product.soldout }"
      />

      <!-- HOVER ACTIONS -->
      <div
        v-if="!product.soldout"
        class="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition"
      >
        <button class="bg-white px-6 py-2 text-xs shadow hover:bg-gray-100 transition">
          Quick View
        </button>
      </div>
    </div>

    <div class="mt-5 text-left">
      <h3 class="text-sm mb-1 font-medium">{{ product.name }}</h3>
      
      <!-- Size options -->
      <div v-if="product.sizes && !product.soldout" class="mb-2 text-xs text-gray-500">
        {{ product.sizes.join('') }}
      </div>

      <!-- Price and actions -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium">
            ${{ product.price }}
            <span
              v-if="product.oldPrice"
              class="text-gray-400 line-through ml-2"
            >
              ${{ product.oldPrice }}
            </span>
          </p>
        </div>
      </div>

      <!-- Action buttons -->
      <div v-if="!product.soldout" class="mt-2">
        <button
          v-if="product.sizes"
          class="text-xs text-gray-600 hover:text-black transition"
        >
          Select Options
        </button>
        <button
          v-else
          class="text-xs text-gray-600 hover:text-black transition"
        >
          Add to cart
        </button>
      </div>

      <!-- Soldout message -->
      <p v-if="product.soldout" class="text-sm text-red-500 mt-2">Soldout</p>
    </div>
  </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  product: Object
});
</script>
