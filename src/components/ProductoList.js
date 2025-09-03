import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductoList() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7010/api/Producto')
            .then(response => setProductos(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div>
            <h1>Listado de Productos</h1>
            <div>
                {productos.length > 0 ? (
                    productos.map(producto => (
                        <div key={producto.id} style={{ opacity: producto.inventario === 0 ? 0.5 : 1 }}>
                            <h2>{producto.nombre}</h2>
                            {/* Verificamos si el producto tiene imagen o no */}
                            <img 
                                src={producto.imagen ? producto.imagen : 'default-image-url.jpg'} 
                                alt={producto.nombre} 
                                style={{ width: '200px', height: 'auto' }} // Agregado un tamaño por defecto para las imágenes
                            />
                            <p>{producto.descripcion}</p>
                            <p>Precio: ${producto.precioVenta}</p>
                            {producto.inventario === 0 && <span>AGOTADO</span>}
                        </div>
                    ))
                ) : (
                    <p>No hay productos disponibles</p>
                )}
            </div>
        </div>
    );
}

export default ProductoList;
