import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditProduct() {
    const { id } = useParams();
    const [value, setValue] = useState('');
    const [product, setProduct] = useState({
        name: '',
        sku: '',
        description: '',
        cost: 0, // Inicializado con 0, ya que parece ser un número.
    });

    const navigate = useNavigate();

    useEffect(() => {
        const getProductToEdit = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/product/${id}`);
                setProduct(response.data.product);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        getProductToEdit();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setValue(selectedValue);
        setProduct({
            ...product,
            completed: selectedValue,
        });
    };

    const editProduct = async () => {

        try {
            const body = {
                name: product.name,
                sku: product.sku,
                description: product.description,
                cost: product.cost,
            };

            //console.log("body", body);

            const response = await axios.put(`http://localhost:8000/api/product/${id}`, body);

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: '¡Se ha editado el producto!',
                allowOutsideClick: false,
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(`/`); // Redirige al usuario a la página de inicio
                }
            });
        } catch (error) {
            let errorMessage = 'Error al actualizar el producto';

            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Nombre y Sku es obligatorio",
                allowOutsideClick: false,
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location = `/`; // Redirige al usuario a la página de inicio
                }
            });
        }

    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <h1>Edita el Producto</h1>
                <div className='col-sm-5'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="name"
                                className="form-control"
                                placeholder="Nombre"
                                value={product.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción:</label>
                            <input
                                type="text"
                                id="descripcion"
                                name="description"
                                className="form-control"
                                placeholder="Descripción"
                                value={product.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sku">Sku:</label>
                            <input
                                type="text"
                                id="sku"
                                name="sku"
                                className="form-control"
                                placeholder="Sku"
                                value={product.sku}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cost">Costo:</label>
                            <input
                                type="number"
                                id="cost"
                                name="cost"
                                className="form-control"
                                placeholder="Costo"
                                value={product.cost}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="button" className="btn btn-primary mt-2" onClick={editProduct}>
                            Editar Producto
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
