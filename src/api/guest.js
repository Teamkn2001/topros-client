import axios from '../configs/axios';

export const getPopularItems = () => axios.get('/getPopularItems')
export const getRandomItems = () => axios.get('/getRandomItems')
export const getPopularUsers = () => axios.get('/getPopularUsers')