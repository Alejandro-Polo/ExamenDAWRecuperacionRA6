import { useEffect, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import { useDebounce } from "../hooks/useDebounce";
import GetFech from "../utils/httpClient";
import CardAmiibo from "./CardAmiibo";
import { Pagination } from "react-bootstrap";

export default function CardsAmiibos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 8;
    const maxNumerosVisibles = 6;

    const query = useQuery();
    const filtro = query.get("filtro");
    const filtroSearch = query.get("search");
    const filtroDelay = useDebounce(filtro || "", 400);
    const searchDelay = useDebounce(filtroSearch || "", 400);

    useEffect(() => {
        async function cargarProductos() {
            setCargando(true);
            const urlapi = "https://www.amiiboapi.com/api/amiibo/";
            const response = await GetFech(urlapi);
            setProductos(response);
            setCargando(false);
        }
        cargarProductos();
    }, []);

    let productosFiltrados = [...productos];

    if (filtroDelay) {
        productosFiltrados = productosFiltrados.filter(
            (producto) => producto.amiiboSeries === filtroDelay
        );
    }

    if (searchDelay) {
        productosFiltrados = productosFiltrados.filter((producto) =>
            producto.name.toLowerCase().includes(searchDelay.toLowerCase())
        );
    }

    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
    const indiceInicial = (paginaActual - 1) * productosPorPagina;
    const indiceFinal = indiceInicial + productosPorPagina;
    const productosPagina = productosFiltrados.slice(indiceInicial, indiceFinal);

    const obtenerPaginasVisibles = () => {
        let inicio = Math.max(1, paginaActual - Math.floor(maxNumerosVisibles / 2));
        let fin = Math.min(totalPaginas, inicio + maxNumerosVisibles - 1);

        if (fin - inicio + 1 < maxNumerosVisibles) {
            inicio = Math.max(1, fin - maxNumerosVisibles + 1);
        }

        return [...Array(fin - inicio + 1).keys()].map(i => i + inicio);
    };

    return (
        <div className="container mt-4">
            {cargando ? (
                <div className="text-center">
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : productosPagina.length > 0 ? (
                <>
                    <div className="row">
                        {productosPagina.map((elemento) => (
                            <div key={`${elemento.head}${elemento.tail}`} className="col-md-3 mb-4">
                                <CardAmiibo amiiboproducto={elemento} />
                            </div>
                        ))}
                    </div>

                    {totalPaginas > 1 && (
                        <Pagination className="justify-content-center mt-4">
                            <Pagination.First onClick={() => setPaginaActual(1)} disabled={paginaActual === 1} />
                            <Pagination.Prev onClick={() => setPaginaActual(paginaActual - 1)} disabled={paginaActual === 1} />

                            {obtenerPaginasVisibles().map((num) => (
                                <Pagination.Item
                                    key={num}
                                    active={num === paginaActual}
                                    onClick={() => setPaginaActual(num)}
                                >
                                    {num}
                                </Pagination.Item>
                            ))}

                            <Pagination.Next onClick={() => setPaginaActual(paginaActual + 1)} disabled={paginaActual === totalPaginas} />
                            <Pagination.Last onClick={() => setPaginaActual(totalPaginas)} disabled={paginaActual === totalPaginas} />
                        </Pagination>
                    )}
                </>
            ) : (
                <p className="text-center text-danger">No se encontraron productos.</p>
            )}
        </div>
    );
}
