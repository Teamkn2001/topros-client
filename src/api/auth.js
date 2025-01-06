import axios from "../configs/axios";

export const register = (form) =>  axios.post('/auth/register', form)
export const login = (form) => axios.post('/auth/login', form)