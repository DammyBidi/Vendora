import api from './api'

export const authService = {
  login(credentials) {
    return api.post('/login', credentials)
  },

  register(userData) {
    return api.post('/register', userData)
  },

  logout() {
    localStorage.removeItem('token')
    return api.post('/auth/logout')
  },

  getProfile() {
    return api.get('/auth/profile')
  },

  updateProfile(userData) {
    return api.put('/auth/profile', userData)
  },
}

export default authService
