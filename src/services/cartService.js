import api from './api'

export const cartService = {
  getCart() {
    return api.get('/cart')
  },

  addItem(productId, quantity = 1) {
    return api.post('/cart/items', { productId, quantity })
  },

  updateItem(itemId, quantity) {
    return api.put(`/cart/items/${itemId}`, { quantity })
  },

  updateQuantity(product_id, quantity) {
    return api.post('/cart/updateQuantity', { product_id, quantity })
  },

  removeItem(itemId) {
    return api.delete(`/cart/${itemId}`)
  },

  clearCart() {
    return api.delete('/cart')
  },

  checkout(checkoutData) {
    return api.post('/cart/checkout', checkoutData)
  },
}

export default cartService
