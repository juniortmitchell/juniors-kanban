import axios from 'axios'

//.NEt backend is using port 5154
const API_BASE_URL = 'http://localhost:5154/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
})

// Request interceptor for adding auth tokens when added in the future
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for handling errors globally
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)

    // Handle different error types
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.warn('Unauthorized access - redirect to login if needed')
    }

    if (error.response?.status === 404) {
      console.warn('Resource not found')
    }

    if (error.response?.status >= 500) {
      console.error('Server error occurred')
    }

    return Promise.reject(error)
  },
)

export default apiClient
export { API_BASE_URL }
