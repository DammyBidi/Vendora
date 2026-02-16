import { createRouter, createWebHistory } from 'vue-router'

import homepage from '@/views/homepage.vue'
import shoppage from '@/views/shoppage.vue'
import productdetail from '@/views/productdetail.vue'
import loginpage from '@/views/loginpage.vue'
import registerpage from '@/views/registerpage.vue'
import cartpage from '@/views/cartpage.vue'
import wishlistpage from '@/views/wishlistpage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homepage
    },
    {
      path: '/shop',
      name: 'shop',
      component: shoppage
    },
    {
      path: '/product/:id',
      name: 'productdetail',
      component: productdetail
    },
    {
      path: '/products/9-without-shortcode-product',
      name: 'product-9',
      component: productdetail
    },
    {
      path: '/account/login',
      name: 'login',
      component: loginpage
    },
    {
      path: '/account/register',
      name: 'register',
      component: registerpage
    },
    {
      path: '/cart',
      name: 'cart',
      component: cartpage
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: wishlistpage
    },


  ],
})

export default router
