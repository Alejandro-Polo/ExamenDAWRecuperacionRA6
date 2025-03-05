import React, { useState, useEffect } from "react";
import CardsAmiibos from "../componentes/CardsAmiibos";
import Menu from "../componentes/Menu";
import FiltroAmiibo from "../componentes/FiltroAmiibo";
import Buscador from "../componentes/Buscador";
import { useQuery } from "../hooks/useQuery";

export default function Principal() {
    const query = useQuery();
    const filtro = query.get("filtro");
    const filtroSearch = query.get("search");
    const [cantidadCarrito, setCantidadCarrito] = useState(0);

    useEffect(() => {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        setCantidadCarrito(carrito.reduce((acc, item) => acc + item.cantidad, 0));
    }, []);

    return (
        <div className="container">
          
            <Menu cantidadCarrito={cantidadCarrito} />  
            
            <h1 className="text-center mt-4">Tienda de Amiibos</h1>
            <div className="row mb-3">
                <div className="col-md-6">
                    <FiltroAmiibo filtro={filtro} />
                </div>
                <div className="col-md-6">
                    <Buscador filtroSearch={filtroSearch} />
                </div>
            </div>
            <CardsAmiibos />
        </div>
    );
}
