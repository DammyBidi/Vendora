import api from './api'
import { setAuthToken } from './api'

export const authService = {
  login(credentials) {
    return api.post('/login', credentials)
  },

  register(userData) {
    return api.post('/register', userData)
  },

  async logout() {
    try {
      await api.post('/logout')
    } catch (e) {
      // ignore network errors; still remove token client-side
    }
    try { localStorage.removeItem('token') } catch (_) {}
    setAuthToken(null)
  },

  getUser() {
    return api.get('/user')
  },

  getProfile() {
    return api.get('/auth/profile')
  },

  updateProfile(userData) {
    return api.put('/auth/profile', userData)
  },
  // quick client-side check for presence of token
  isLoggedIn() {
    return !!localStorage.getItem('token')
  },
}

export default authService
