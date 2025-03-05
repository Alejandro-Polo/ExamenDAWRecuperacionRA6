import { useNavigate } from "react-router";

export default function Buscador({ filtroSearch }) {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        navigate(searchValue ? `/Principal?search=${searchValue}` : "/Principal");
    };

    return (
        <div className="container mt-3">
            <input
                type="text"
                className="form-control"
                placeholder="Buscar productos..."
                value={filtroSearch || ""}
                onChange={handleSearch}
            />
        </div>
    );
}
