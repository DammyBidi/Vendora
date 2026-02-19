<template>
  <div class="min-h-screen bg-white">
    <!-- Top Header -->
    <header class="border-b">
      <div class="max-w-[1200px] mx-auto px-6 py-5 flex items-center justify-between">
        <h1 class="text-lg font-semibold tracking-tight">
          Lezada - Multipurpose eCommerce Shopify Theme
        </h1>

        <div class="text-xl">
          👜
        </div>
      </div>
    </header>

    <!-- Main Layout -->
    <div class="max-w-[1200px] mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">

        <!-- LEFT (Scrollable) -->
        <div
          class="lg:pr-12 lg:border-r lg:border-gray-200"
        >
          <div class="h-[calc(100vh-80px)] overflow-y-auto pr-2 py-10">

            <!-- CONTACT -->
            <section class="mb-10">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-2xl font-bold">Contact</h2>
            
              </div>

              <div class="relative">
                <input
                  placeholder="Email or mobile phone number"
                  class="w-full border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  ▼
                </div>
              </div>

              <label class="flex items-center gap-3 text-sm text-gray-700 mt-4">
                <input type="checkbox" class="w-4 h-4 border-gray-300 rounded" />
                Email me with news and offers
              </label>
            </section>

            <!-- DELIVERY -->
            <section class="mb-10">
              <h2 class="text-2xl font-bold mb-4">Delivery</h2>

              <div class="relative mb-4">
                <div class="border border-gray-300 rounded-2xl bg-white">
                  <span class="absolute left-6 top-3 text-sm text-gray-500 pointer-events-none">Country/Region</span>
                  <select class="w-full bg-transparent px-6 pt-8 pb-4 text-lg appearance-none focus:outline-none">
                    <option>Nigeria</option>
                  </select>
                </div>
                <div class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">▼</div>
              </div>

              <div class="grid grid-cols-2 gap-4 mt-4">
                <input
                  placeholder="First name (optional)"
                  class="border border-gray-300 rounded-2xl px-6 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <input
                  placeholder="Last name"
                  class="border border-gray-300 rounded-2xl px-6 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <input
                placeholder="Address"
                class="w-full border border-gray-300 rounded-2xl px-6 py-4 text-lg mt-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                placeholder="Apartment, suite, etc. (optional)"
                class="w-full border border-gray-300 rounded-2xl px-6 py-4 text-lg mt-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
              />

              <div class="grid grid-cols-3 gap-4 mt-4">
                <input
                  placeholder="City"
                  class="border border-gray-300 rounded-2xl px-6 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
                <div class="relative">
                  <div class="border border-gray-300 rounded-2xl bg-white">
                    <span class="absolute left-6 top-3 text-sm text-gray-500 pointer-events-none">State</span>
                    <select class="w-full bg-transparent px-6 pt-8 pb-4 text-lg appearance-none focus:outline-none">
                      <option>Lagos</option>
                    </select>
                  </div>
                  <div class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">▼</div>
                </div>
                <input
                  placeholder="Postal code (optional)"
                  class="border border-gray-300 rounded-2xl px-6 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <label class="flex items-center gap-3 text-sm text-gray-700 mt-4">
                <input type="checkbox" class="w-4 h-4 border-gray-300 rounded" />
                Save this information for next time
              </label>
            </section>

            <!-- SHIPPING -->
            <section class="mb-10">
              <h3 class="font-semibold mb-3 text-sm">Shipping method</h3>

              <div class="border border-gray-900 rounded-lg px-5 py-4 flex items-center justify-between">
                <span class="text-sm font-medium">International Shipping</span>
                <span class="text-sm font-semibold">$20.00</span>
              </div>
            </section>

            <!-- PAYMENT -->
            <section class="mb-10">
              <h2 class="text-2xl font-bold mb-2">Payment</h2>
              <p class="text-sm text-gray-500 mb-4">
                All transactions are secure and encrypted.
              </p>

              <div class="border border-gray-300 rounded-lg overflow-hidden">

                <!-- Credit Card Header -->
                <div class="bg-gray-100 px-5 py-4 flex items-center justify-between border-b border-gray-300">
                  <label class="flex items-center gap-3 text-sm font-medium">
                    <input
                      type="radio"
                      :checked="paymentMethod === 'card'"
                      @click="togglePayment('card')"
                      class="w-4 h-4"
                    />
                    Credit card
                  </label>

                  <div class="bg-yellow-500 text-white text-xs px-2 py-1 rounded font-bold">
                    B
                  </div>
                </div>

                <!-- Card Inputs -->
                <div class="p-5 space-y-4 bg-white">
                  <div class="relative">
                    <input
                      placeholder="Card number"
                      class="w-full border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                      🔒
                    </span>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <input
                      placeholder="Expiration date (MM / YY)"
                      class="border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <input
                      placeholder="Security code"
                      class="border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <input
                    placeholder="Name on card"
                    class="w-full border border-gray-300 rounded-lg px-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />

                </div>

                <!-- billing checkbox moved here so it sits between card inputs and COD -->
                <div class="px-5">
                  <label class="flex items-center gap-3 text-sm text-gray-700">
                    <input type="checkbox" v-model="useShippingAsBilling" class="w-4 h-4 border-gray-300 rounded" />
                    Use shipping address as billing address
                  </label>
                </div>

                <!-- COD -->
                <div class="border-t border-gray-300 px-5 py-4 bg-white">
                  <label class="flex items-center gap-3 text-sm text-gray-700">
                    <input
                      type="radio"
                      :checked="paymentMethod === 'cod'"
                      @click="togglePayment('cod')"
                      class="w-4 h-4"
                    />
                    Cash on Delivery (COD)
                  </label>
                </div>
              </div>

              <!-- PAY BUTTON -->
              <button
                @click="payNow"
                class="mt-6 w-full bg-black text-white py-4 rounded-lg font-semibold text-sm hover:opacity-90 transition"
              >
                Pay now
              </button>
            </section>

            <footer class="pt-10 border-t text-xs text-gray-500">
              All rights reserved Lezada - Multipurpose eCommerce Shopify Theme
            </footer>

          </div>
        </div>

        <!-- RIGHT (Sticky Summary - Not scrolling) -->
        <aside class="lg:pl-12 py-10">
          <div class="sticky top-10">

            <div v-if="items.length === 0" class="text-gray-600">
              Your cart is empty.
            </div>

            <div v-else class="space-y-6">
              <!-- Cart Items -->
              <div v-for="it in items" :key="it.id" class="flex items-center gap-4">
                <div class="relative w-16 h-16 border border-gray-300 rounded-lg bg-white flex items-center justify-center overflow-visible">
                  <img
                    :src="it.image || it.hover_image"
                    class="max-h-12 object-contain"
                  />

                  <span
                      class="absolute -top-2 -right-2 bg-black text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-semibold z-10"
                  >
                    {{ it.quantity || 1 }}
                  </span>
                </div>

                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">
                    {{ it.id }}. {{ it.name }}
                  </p>
                </div>

                <p class="text-sm font-semibold text-gray-900">
                  ${{ (it.price * (it.quantity || 1)).toFixed(2) }}
                </p>
              </div>

              <!-- Summary -->
              <div class="pt-6 border-t border-gray-200 space-y-3 text-sm">
                <div class="flex justify-between text-gray-700">
                  <span>Subtotal · {{ totalItems }} items</span>
                  <span class="font-medium">${{ subtotal }}</span>
                </div>

                <div class="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span class="font-medium">$20.00</span>
                </div>

                <div class="pt-4 border-t border-gray-200 flex justify-between items-end">
                  <div>
                    <p class="text-lg font-bold">Total</p>
                  </div>

                  <div class="text-right">
                    <p class="text-xs text-gray-500">USD</p>
                    <p class="text-2xl font-bold">${{ totalWithShipping }}</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </aside>

      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import useCartStore from "@/stores/cart";

const store = useCartStore();

const items = computed(() => store.items || []);

const totalItems = computed(() => {
  return (store.items || []).reduce((acc, item) => acc + (item.quantity || 1), 0);
});

const subtotal = computed(() => (store.totalPrice || 0).toFixed(2));

const totalWithShipping = computed(() =>
  (Number(store.totalPrice || 0) + 20).toFixed(2)
);

// payment method: 'card' | 'cod' | null
const paymentMethod = ref('card')
const useShippingAsBilling = ref(true)

const togglePayment = (val) => {
  if (paymentMethod.value === val) paymentMethod.value = null
  else paymentMethod.value = val
}

const payNow = () => {
  window.open(
    "https://lezada-demo.myshopify.com/checkouts/cn/hWN8vqj66ljTZQdmf0laSEJn/en-ng?_r=AQABqaFmV5Zfn10vI6ER7UkaVMj_TzbZU9NDATdxZj-N3zk",
    "_blank"
  );
};
</script>

<style scoped>
/* smoother scroll like Shopify */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}
</style>
