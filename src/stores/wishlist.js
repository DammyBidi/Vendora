import { defineStore } from 'pinia'
import api from '@/services/api'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [],
    loading: false,
    loadingIds: [],
    error: null,
  }),

  actions: {
    async fetchWishlist() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/wishlist')
        const payload = res.data?.data || res.data || []
        this.items = Array.isArray(payload) ? payload : (payload.items || [])
      } catch (e) {
        this.error = e
      } finally {
        this.loading = false
      }
    },

    async addToWishlist(product_id) {
      // per-item loading indicator + optimistic update
      if (!this.loadingIds.includes(product_id)) this.loadingIds.push(product_id)
      this.error = null
      // optimistic insert to make UI reflect addition immediately after loading
      let optimisticAdded = false
      if (!this.items.find(i => i.id === product_id)) {
        this.items.unshift({ id: product_id })
        optimisticAdded = true
      }
      try {
        const res = await api.post('/wishlist/add', { product_id })
        const data = res.data?.data || res.data
        if (data) {
          // replace optimistic entry with server-provided item (if available)
          const idx = this.items.findIndex(i => i.id === product_id)
          if (idx > -1) this.items[idx] = { ...this.items[idx], ...data }
        }
        return res
      } catch (e) {
        this.error = e
        // rollback optimistic add
        if (optimisticAdded) this.items = this.items.filter(i => i.id !== product_id)
        throw e
      } finally {
        this.loadingIds = this.loadingIds.filter(id => id !== product_id)
      }
    },

    async removeFromWishlist(product_id) {
      if (!this.loadingIds.includes(product_id)) this.loadingIds.push(product_id)
      this.error = null
      try {
        // primary: DELETE /wishlist/:id
        await api.delete(`/wishlist/${product_id}`)
      } catch (e) {
        // fallbacks for older endpoints
        try { await api.post('/wishlist/remove', { product_id }) } catch (_) {}
        try { await api.delete(`/wishlist/items/${product_id}`) } catch (_) {}
      }
      // remove any matching entries (handle different item shapes)
      const sid = product_id === undefined || product_id === null ? null : String(product_id)
      this.items = this.items.filter(i => {
        if (!i) return false
        const candidates = [i.id, i.product_id, (i.product && i.product.id)]
        return !candidates.some(c => c !== undefined && c !== null && String(c) === sid)
      })
      this.loadingIds = this.loadingIds.filter(id => id !== product_id)
    },
  },
})

export default useWishlistStore
