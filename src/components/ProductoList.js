import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductoList() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:5001/api/Producto')
            .then(response => setProductos(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    return (
        <div>
            <h1>Listado de Productos</h1>
            <div>
                {productos.map(producto => (
                    <div key={producto.id} style={{ opacity: producto.inventario === 0 ? 0.5 : 1 }}>
                        <h2>{producto.nombre}</h2>
                        <img src={producto.imagen} alt={producto.nombre} />
                        <p>{producto.descripcion}</p>
                        <p>Precio: ${producto.precioVenta}</p>
                        {producto.inventario === 0 && <span>AGOTADO</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductoList;