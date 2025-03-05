import { Link } from "react-router";

export default function CardAmiibo({ amiiboproducto }) {
    const amiiboid = amiiboproducto.head + amiiboproducto.tail;

    const agregarAlCarrito = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const index = carrito.findIndex(item => item.id === amiiboid);

        if (index !== -1) {
            carrito[index].cantidad += 1;
        } else {
            carrito.push({
                id: amiiboid,
                nombre: amiiboproducto.name,
                imagen: amiiboproducto.image,
                cantidad: 1
            });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        window.dispatchEvent(new Event("actualizarCarrito"));
    };

    return (
        <div className="card text-center p-3 shadow">
            <Link to={`/detalles/${amiiboid}`}>
                <img src={amiiboproducto.image} className="card-img-top img-fluid" style={{ width: "18rem", height: "22rem" }} alt={amiiboproducto.name} />
            </Link>
            <div className="card-body">
                <h5 className="card-title">{amiiboproducto.name}</h5>
                <p className="card-text">Serie: {amiiboproducto.gameSeries}</p>
                <button className="btn btn-success" onClick={agregarAlCarrito}>
                    + Agregar al carrito
                </button>
            </div>
        </div>
    );
}
