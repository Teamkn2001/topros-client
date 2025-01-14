import axios from 'axios'

const PORT = import.meta.env.VITE_PORT || 7200

axios.defaults.baseURL = `http://localhost:${PORT}`

export default axios