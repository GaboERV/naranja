import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Registro from "./pages/auth/Registro";
import Dashboard from "./pages/dashboard/Dashboard";
import "./index.css";
import Layout from "./layout/Layout";
import Recursos from "./pages/recursos/Recursos";
import Proyectos from "./pages/proyectos/Proyectos";
import Equipos from "./pages/Equipos/Equipos";
import LoginEmpleado from "./pages/auth/LoginEmpleado";
import VerifyEmail from "./pages/auth/VerifyEmail";
import VerifyAutentication from "./pages/auth/VerifyAutentication";
import Inicio from "./pages/empleados/Inicio";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login-empleado" element={<LoginEmpleado />} />
        <Route path="/Registro" element={<Registro />}/>
        <Route path="/Verify-email" element={<VerifyEmail />} />ri
        <Route path="/Verify" element={<VerifyAutentication />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="Recursos" element={<Recursos/>} />
          <Route path="Proyectos" element={<Proyectos/>} />
          <Route path="Equipos" element={<Equipos/>} />
        </Route>
        <Route path="/Empleados" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="Inicio" element={<Inicio/>} />
        </Route>
      </Routes>
     
    </Router>
  );
};

export default App;
