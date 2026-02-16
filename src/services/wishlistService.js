import api from './api'

export const wishlistService = {
  getWishlist() {
    return api.get('/wishlist')
  },

  addItem(productId) {
    return api.post('/wishlist/items', { productId })
  },

  removeItem(productId) {
    return api.delete(`/wishlist/items/${productId}`)
  },

  clearWishlist() {
    return api.delete('/wishlist')
  },
}

export default wishlistService
