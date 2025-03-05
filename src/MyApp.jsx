import Principal from '../paginas/principal';
import MostrarCarrito from '../paginas/MostrarCarrito';
import { Routes, Route } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../paginas/Login';
import Detalles from '../componentes/Detalles';

export default function MyApp() {

  return (
<>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/Principal" element={<Principal />} />
          <Route path="/Carrito" element={<MostrarCarrito/>} />
            <Route path="/detalles/:id" element={<Detalles />} />
        </Routes>
</>  )
}
