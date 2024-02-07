import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/items';

export const addItem = async (itemData) => {
    const response = await axios.post(BASE_URL, itemData);
    return response.data;
};

export const getItems = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
};

export const getItem = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const updateItem = async (id, itemData) => {
    const response = await axios.put(`${BASE_URL}/${id}`, itemData);
    return response.data;
};

export const deleteItem = async (id) => {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
};
