import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function CreateProduct() {
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState();
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSkuChange = (e) => {
        setSku(e.target.value);
    };

    const handleCostChange = (e) => {
        // Verifica que el valor sea un número antes de establecerlo en el estado.
        const value = parseFloat(e.target.value);
        setCost(isNaN(value) ? 0 : value);
    };

    async function createProduct(e) {
        e.preventDefault(); // Evita que se envíe la solicitud GET predeterminada

        const body = {
            name: name,
            sku: sku, // Cambiado de duration a sku
            description: description,
            cost: cost, // Nuevo campo cost
        };

        try {
            const response = await axios.post("http://localhost:8000/api/product", body);

            //console.log(response);

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: '¡Se ha creado el producto!',
                allowOutsideClick: false,
                showConfirmButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    // Redirige al usuario a la página de inicio
                    navigate(`/`);
                }
            });

        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Nombre y Sku es obligatorio", // Cambiado de respose a error.response.data.message
                allowOutsideClick: false,
                showConfirmButton: true,
            })
            //console.log(error);
        }
    }


    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <h1>Crea un producto</h1>
                <div className='col-sm-5'>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                className="form-control"
                                placeholder="Nombre"
                                value={name}
                                onChange={handleNameChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descripcion">Descripción:</label>
                            <input
                                type="text"
                                id="descripcion"
                                name="descripcion"
                                className="form-control"
                                placeholder="Descripción"
                                value={description}
                                onChange={handleDescriptionChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sku">Sku:</label> {/* Cambiado de duracion a sku */}
                            <input
                                type="text"
                                id="sku"
                                name="sku"
                                className="form-control"
                                placeholder="Sku"
                                value={sku}
                                onChange={handleSkuChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cost">Costo:</label> {/* Nuevo campo cost */}
                            <input
                                type="number"
                                id="cost"
                                name="cost"
                                className="form-control"
                                placeholder="Costo"
                                value={cost}
                                onChange={handleCostChange}
                                required
                            />
                        </div>
                        <button className="btn btn-primary mt-2" onClick={createProduct}>
                            Crear Tarea
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
