import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Detalles() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        async function obtenerProducto() {
            const res = await fetch("https://amiiboapi.com/api/amiibo/");
            const datos = await res.json();
            
            const productoEncontrado = datos.amiibo.find(item => `${item.head}${item.tail}` === id);
            setProducto(productoEncontrado);
        }
        obtenerProducto();
    }, [id]);

    return (
        <div className="container mt-4">
            <div className="card p-4 shadow-sm">
                <h2 className="text-center">Detalles del Producto</h2>
                {producto ? (
                    <div className="row align-items-center">
                        <div className="col-md-4 text-center">
                            <img src={producto.image} alt={producto.name} className="img-fluid rounded" />
                        </div>
                        <div className="col-md-8">
                            <h3>{producto.name}</h3>
                            <p><strong>Serie del Juego:</strong> {producto.gameSeries}</p>
                            <p><strong>Personaje:</strong> {producto.character}</p>
                            <p><strong>Serie de Amiibo:</strong> {producto.amiiboSeries}</p>
                            <p><strong>Tipo:</strong> {producto.type}</p>
                            <h5>Fechas de Lanzamiento:</h5>
                            <ul className="list-unstyled">
                                <li><strong>AU:</strong> {producto.release.au || "N/A"}</li>
                                <li><strong>EU:</strong> {producto.release.eu || "N/A"}</li>
                                <li><strong>JP:</strong> {producto.release.jp || "N/A"}</li>
                                <li><strong>NA:</strong> {producto.release.na || "N/A"}</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="d-flex justify-content-center">
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}
