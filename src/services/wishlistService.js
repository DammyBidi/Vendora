import api from './api'

export const wishlistService = {
  getWishlist() {
    return api.get('/wishlist')
  },

  addItem(productId) {
    // prefer the new /wishlist/add endpoint
    return api.post('/wishlist/add', { product_id: productId })
  },

  removeItem(productId) {
    // prefer deleting at /wishlist/:id
    return api.delete(`/wishlist/${productId}`)
  },

  clearWishlist() {
    return api.delete('/wishlist')
  },
}

export default wishlistService
