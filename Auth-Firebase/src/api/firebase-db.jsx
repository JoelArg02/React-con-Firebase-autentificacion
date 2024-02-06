const BASE_URL = 'http://localhost:3000/api/items'; 

export const addItem = async (itemData) => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
    });
    return response.json();
};

export const getItems = async () => {
    const response = await fetch(BASE_URL);
    return response.json();
};


export const getItem = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
};


export const updateItem = async (id, itemData) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
    });
    return response.json();
};


export const deleteItem = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};
