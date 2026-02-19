import axios from 'axios'

const api = axios.create({
  baseURL: 'https://e-commerce-api-ixoyjgks.on-forge.com/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

let _currentToken = null

export function setAuthToken(token) {
  _currentToken = token || null
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`
  } else {
    delete api.defaults.headers.Authorization
  }
}

export function getAuthToken() {
  return _currentToken
}

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = _currentToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // clear in-memory token
      setAuthToken(null)
      try { localStorage.removeItem('token') } catch (_) {}
      // Optionally redirect to login
    }
    return Promise.reject(error)
  }
)

export default api
