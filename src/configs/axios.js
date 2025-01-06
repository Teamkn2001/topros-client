import axios from 'axios'

const PORT = import.meta.env.VITE_PORT || 7200

// console.log(PORT)

axios.defaults.baseURL = `http://localhost:${PORT}`

export default axios