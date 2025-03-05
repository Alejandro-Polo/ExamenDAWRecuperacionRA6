import React, { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Menu() {
    const [cantidadCarrito, setCantidadCarrito] = useState(0);

    useEffect(() => {
        const actualizarCarrito = () => {
            const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
            const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
            setCantidadCarrito(cantidadTotal);
        };

        actualizarCarrito();

        window.addEventListener("actualizarCarrito", actualizarCarrito);

        return () => {
            window.removeEventListener("actualizarCarrito", actualizarCarrito);
        };
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Salir</Link>
                <Link className="navbar-brand" to="/Principal">Inicio</Link>
                <div className="ml-auto">
                    <Link className="btn text-white navbar-brand" to="/Carrito">
                        Carrito <span className="badge bg-danger">{cantidadCarrito}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
