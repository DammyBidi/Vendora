<template>
  <Header />

  <router-view />

  <Footer />

  <CartModal />
</template>

<script setup>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import CartModal from './components/CartModal.vue'
</script>

<style scoped>
/* Global app container could go here if needed */
</style>
