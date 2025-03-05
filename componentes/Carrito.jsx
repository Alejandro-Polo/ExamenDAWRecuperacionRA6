import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Carrito({ actualizarCarrito }) {
    const [carrito, setCarrito] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const carritoLocal = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoLocal);
    }, []);

    const modificarCantidad = (id, cantidad) => {
        let nuevoCarrito = carrito.map(item => {
            if (item.id === id) {
                return { ...item, cantidad: item.cantidad + cantidad };
            }
            return item;
        }).filter(item => item.cantidad > 0);

        setCarrito(nuevoCarrito);
        localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
        actualizarCarrito();
    };

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito");
        setCarrito([]);
        actualizarCarrito();
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Tu Carrito</h2>
            {carrito.length === 0 ? (
                <p className="text-center">El carrito está vacío.</p>
            ) : (
                <div className="d-flex flex-wrap justify-content-center" >
                    {carrito.map((producto) => (
                        <div className="card shadow m-3" key={producto.id} style={{ width: "18rem", height: "30rem" }}>
                            <img 
                                src={producto.imagen} 
                                alt={producto.nombre} 
                                className="card-img-top" 
                                style={{ height: "250px" }} 
                            />
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h5 className="card-title">{producto.nombre}</h5>
                                <p className="card-text">Cantidad: {producto.cantidad}</p>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-danger" onClick={() => modificarCantidad(producto.id, -1)}>➖</button>
                                    <button className="btn btn-success" onClick={() => modificarCantidad(producto.id, 1)}>➕</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {carrito.length > 0 && (
                <div className="text-center">
                    <button className="btn btn-warning mt-3" onClick={vaciarCarrito}>
                        Vaciar Carrito
                    </button>
                </div>
            )}
            <div className="text-center">
                <button className="btn btn-primary mt-3" onClick={() => navigate("/Principal")}>
                    Volver
                </button>
            </div>
        </div>
    );
}
