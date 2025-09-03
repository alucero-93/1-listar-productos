import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ProductoForm({ productId, onSave }) {
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion: '',
        precioVenta: 0,
        costo: 0,
        sku: '',
        inventario: 0,
        imagen: ''
    });

    useEffect(() => {
        if (productId) {
            // Fetch the product to edit
            axios.get(`https://localhost:7010/api/Producto/${productId}`)
                .then(response => setProducto(response.data))
                .catch(error => console.error('Error fetching product:', error));
        }
    }, [productId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const margen = (producto.precioVenta - producto.costo) / producto.precioVenta;

        if (margen < 0.1) {
            alert('El margen de ganancia debe ser al menos del 10%');
            return;
        }

        if (productId) {
            axios.put(`https://localhost:7010/api/Producto/${productId}`, producto)
                .then(response => onSave())
                .catch(error => console.error('Error updating product:', error));
        } else {
            axios.post('https://localhost:7010/api/Producto', producto)
                .then(response => onSave())
                .catch(error => console.error('Error creating product:', error));
        }
    };

    return (
        <div>
            <h1>{productId ? 'Editar Producto' : 'Crear Producto'}</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={producto.nombre} onChange={(e) => setProducto({ ...producto, nombre: e.target.value })} placeholder="Nombre" required />
                <textarea value={producto.descripcion} onChange={(e) => setProducto({ ...producto, descripcion: e.target.value })} placeholder="Descripción" required />
                <input type="number" value={producto.precioVenta} onChange={(e) => setProducto({ ...producto, precioVenta: e.target.value })} placeholder="Precio Venta" required />
                <input type="number" value={producto.costo} onChange={(e) => setProducto({ ...producto, costo: e.target.value })} placeholder="Costo" required />
                <input type="text" value={producto.sku} onChange={(e) => setProducto({ ...producto, sku: e.target.value })} placeholder="SKU" required />
                <input type="number" value={producto.inventario} onChange={(e) => setProducto({ ...producto, inventario: e.target.value })} placeholder="Inventario" required />
                <input type="text" value={producto.imagen} onChange={(e) => setProducto({ ...producto, imagen: e.target.value })} placeholder="Imagen URL" required />
                <button type="submit">Guardar</button>
            </form>
        </div>
    );
}

export default ProductoForm;