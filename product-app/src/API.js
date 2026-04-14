import axios from "axios";

const BASE_URL = "http://localhost:1343/api/v1";

export const getProducts = () => axios.get(`${BASE_URL}/getpro`);

export const getProductById = (id) =>
    axios.get(`${BASE_URL}/getid/${id}`);

export const addProduct = (data) =>
    axios.post(`${BASE_URL}/insertp`, data);

export const updateProduct = (data) =>
    axios.put(`${BASE_URL}/updatepro/${data.id}`, data);

export const patchProduct = (id, data) =>
    axios.patch(`${BASE_URL}/patch/${id}`, data);

export const deleteProduct = (id) =>
    axios.delete(`${BASE_URL}/delete/${id}`);