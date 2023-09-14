import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import Swal from 'sweetalert2';

export default function Home() {


    const [product, setProduct] = useState([])


    useEffect(() => {
        // Obtener la lista de locales y sus horarios disponibles desde la API
        getProducts()
    }, []);


    async function deleteProduct(id) {
        try {
            const confirmResult = await Swal.fire({
                icon: 'warning',
                title: '¿Estás seguro?',
                text: '¿Deseas eliminar este producto?',
                showCancelButton: true,
                confirmButtonText: 'Sí',
                cancelButtonText: 'No',
                allowOutsideClick: false,
                showConfirmButton: true,
            });

            if (confirmResult.isConfirmed) {
                // Si el usuario confirma, elimina el producto
                await axios.delete(`http://localhost:8000/api/product/${id}`);

                // Muestra un mensaje de éxito después de eliminar el producto
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Se ha eliminado el producto!',
                    allowOutsideClick: false,
                    showConfirmButton: true,
                });

                // Actualiza la lista de productos después de eliminar
                getProducts();
            }
        } catch (error) {
            console.log(error);
        }
    }



    async function getProducts() {

        try {
            const response = await axios.get("http://localhost:8000/api/product");

            // Filtra las tareas con completed: 'no'
            //const filteredTasks = response.data.tasks.filter((task) => task.completed === 'no');

            //console.log(response.data.products);
            setProduct(response.data.products);
        } catch (error) {
            console.log(error);
        }


    }


    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <h1>Agenda de Tareas</h1>
                    <a href="/create"><button className='btn btn-success mt-3'>Crear un nuevo producto</button></a>
                    <div className="col-sm mt-5">
                        <h1>Lista de Productos</h1>
                        {product.length === 0 ? (
                            <p>No tienes productos, registra uno nuevo</p>
                        ) : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Descripción</th>
                                        <th>Sku</th>
                                        <th>Costo</th>
                                        <th>Editar</th>
                                        <th>Costo</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {product.map((producto) => (
                                        <tr key={producto._id}>
                                            <td>{producto.name}</td>
                                            <td>{producto.description}</td>
                                            <td>{producto.sku}</td>
                                            <td>{producto.cost}</td>
                                            <td>
                                                <Link to={`/edit/${producto._id}`}>
                                                    <button className="btn btn-success ml-2">Editar</button>
                                                </Link>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => deleteProduct(producto._id)} // Call deleteTask with task id
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}    