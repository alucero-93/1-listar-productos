import React, { useState, useEffect } from 'react';
import ProductoList from '../components/ProductoList';
import ProductoForm from '../components/ProductoForm';

function AdminDashboard() {
    const [productId, setProductId] = useState(null);

    return (
        <div>
            <h1>Panel de Administrador</h1>
            <ProductoList />
            <ProductoForm productId={productId} onSave={() => setProductId(null)} />
        </div>
    );
}

export default AdminDashboard;
