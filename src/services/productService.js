import api from './api'

export const productService = {
  getAll(params = {}) {
    return api.get('/products', { params })
  },

  getById(id) {
    return api.get(`/products/${id}`)
  },

  getByCategory(categoryId, params = {}) {
    return api.get(`/products/category/${categoryId}`, { params })
  },

  search(query, params = {}) {
    return api.get('/products/search', { params: { q: query, ...params } })
  },

  getFeatured() {
    return api.get('/products/featured')
  },

  getCategories() {
    return api.get('/categories')
  },
}

export default productService
