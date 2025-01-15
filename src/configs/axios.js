import axios from 'axios'

const baseURL = import.meta.env.VITE_BACKEND_URL 

axios.defaults.baseURL =  baseURL

export default axios