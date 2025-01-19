import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Registro from "./pages/auth/Registro";
import Dashboard from "./pages/dashboard/Dashboard";
import "./index.css";
import Layout from "./layout/Layout";
import Recursos from "./pages/recursos/Recursos";
import Proyectos from "./pages/proyectos/Proyectos";
import Equipos from "./pages/Equipos/Equipos";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Registro" element={<Registro />}/>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="Recursos" element={<Recursos/>} />
          <Route path="Proyectos" element={<Proyectos/>} />
          <Route path="Equipos" element={<Equipos/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
