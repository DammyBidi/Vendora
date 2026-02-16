<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue'

defineProps({
  products: {
    type: Array,
    default: () => []
  }
})
</script>
