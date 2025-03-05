import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import GetFech from "../utils/httpClient";

export default function FiltroAmiibo({ filtro }) {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function cargarCategorias() {
            const urlapi = "https://www.amiiboapi.com/api/amiibo/";
            const response = await GetFech(urlapi);
            const mapCategorias = [...new Set(response.map((e) => e.amiiboSeries))];
            setCategorias(mapCategorias);
        }
        cargarCategorias();
    }, []);

    const handleFiltro = (e) => {
        const filtroValue = e.target.value;
        navigate(filtroValue ? `/Principal?filtro=${filtroValue}` : "/Principal");
    };

    return (
        <div className="container mt-3">
            <select className="form-select" onChange={handleFiltro} value={filtro || ""}>
                <option value="">Todas las categorías</option>
                {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                        {categoria}
                    </option>
                ))}
            </select>
        </div>
    );
}
