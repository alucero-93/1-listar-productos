import axios from 'axios';

const API_URL = 'https://localhost:7010/api/Producto';

export const getProductos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const createProducto = async (producto) => {
    try {
        const response = await axios.post(API_URL, producto);
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error);
    }
};

export const updateProducto = async (id, producto) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, producto);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

export const deleteProducto = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};
