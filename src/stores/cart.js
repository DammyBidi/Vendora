import { defineStore } from 'pinia'
import api from '@/services/api'
import cartService from '@/services/cartService'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    showCartModal: false,
    lastAddedItem: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchCart() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/cart')
        const payload = res.data?.data || res.data || {}
        // normalize if payload list
        const raw = Array.isArray(payload) ? payload : (payload.items || [])
        // coerce numeric fields to numbers for consistency
        this.items = raw.map(i => ({
          ...i,
          price: parseFloat(i.price) || 0,
          quantity: parseInt(i.quantity || 0, 10) || 0,
        }))
        this._recalculate()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async addToCart(product_id, quantity = 1) {
      this.loading = true
      this.error = null
      try {
        const body = { product_id, quantity }
        const res = await api.post('/cart/add', body)
        const data = res.data?.data || res.data

        // backend returns the added item in `data`
        if (data) {
          // try to update existing item if same id
          const idx = this.items.findIndex(i => i.id === data.id)
          if (idx > -1) {
            // replace quantity and other fields
            this.items[idx] = { ...this.items[idx], ...data }
          } else {
            this.items.unshift(data)
          }

          this.lastAddedItem = data
          this.showCartModal = true
          this._recalculate()
          // refresh from backend to keep canonical state (non-blocking)
          try { await this.fetchCart() } catch (e) { /* ignore */ }
        }

        return res
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    async removeItem(itemId) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/cart/${itemId}`)
        this.items = this.items.filter(i => i.id !== itemId)
        this._recalculate()
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async updateQuantity(product_id, quantity) {
      this.loading = true
      this.error = null
      try {
        const res = await cartService.updateQuantity(product_id, quantity)
        const data = res.data?.data || res.data

        if (data) {
          const idx = this.items.findIndex(i => i.id === data.id || i.id === product_id)
          const normalized = {
            ...data,
            price: parseFloat(data.price) || 0,
            quantity: parseInt(data.quantity || data.qty || quantity || 0, 10) || 0,
          }

          if (idx > -1) {
            this.items[idx] = { ...this.items[idx], ...normalized }
          } else {
            this.items.unshift(normalized)
          }

          this._recalculate()
        }
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    async clearCart() {
      this.loading = true
      this.error = null
      try {
        await api.delete('/cart')
        this.items = []
        this._recalculate()
      } catch (e) {
        this.error = e
        throw e
      } finally {
        this.loading = false
      }
    },

    clearModal() {
      this.showCartModal = false
      this.lastAddedItem = null
    },

    _recalculate() {
      let qty = 0
      let price = 0
      for (const it of this.items) {
        const q = parseInt(it.quantity || 0, 10)
        const p = parseFloat(it.price || 0)
        qty += isNaN(q) ? 0 : q
        price += (isNaN(p) ? 0 : p) * (isNaN(q) ? 0 : q)
      }
      this.totalQuantity = qty
      this.totalPrice = parseFloat(price.toFixed(2))
    },
  },
})

export default useCartStore
