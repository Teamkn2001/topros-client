import { API_ENDPOINTS } from '../../config';
import axios from '../configs/axios';

export const getPopularItems = () => axios.get(API_ENDPOINTS.POPULAR_ITEMS)
export const getRandomItems = () => axios.get(API_ENDPOINTS.RANDOM_ITEMS)
export const getPopularUsers = () => axios.get(API_ENDPOINTS.POPULAR_USERS)

export const getUserById = async (userId) => {
    const rs = await axios.get(`${API_ENDPOINTS.GET_USER}/${userId}`)
    return rs.data
}
export const getUserByUsername = (username) => axios.get(`${API_ENDPOINTS.SEARCH_USERS}/${username}`)
export const getItemById = (itemId) => axios.get(`${API_ENDPOINTS.GET_ITEM}/${itemId}`)