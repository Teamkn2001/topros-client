import axios from '../configs/axios';

export const getPopularItems = () => axios.get('/getPopularItems')
export const getRandomItems = () => axios.get('/getRandomItems')
export const getPopularUsers = () => axios.get('/getPopularUsers')

export const getUserById = async (userId) => {
    const rs = await axios.get(`/getUser/${userId}`)
    return rs.data
}
export const getUserByUsername = (username) => axios.get(`/searchUsers/${username}`)
export const getItemById = (itemId) => axios.get(`/getItemById/${itemId}`)

export const searchItems = (itemName) => axios.get(`/searchItems/items?itemName=${itemName}`)
export const searchUsers = (userName) => axios.get(`/searchUsers/users?userName=${userName}`)