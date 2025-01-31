import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Aside from './Aside';

const EmpleadoLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const tokenEmpleado = localStorage.getItem('token-empleado'); // Token para empleados
    const tokenAdmin = localStorage.getItem('token'); // Token para administradores

    // Si existen ambos tokens, eliminar el de administrador
    if (tokenEmpleado && tokenAdmin) {
        localStorage.removeItem('token');
    }

    if (!tokenEmpleado) {
        if (tokenAdmin) {
            navigate('/'); // Si es admin, se bloquea
        } else {
            navigate('/login'); // Si no hay token, se redirige a login
        }
    } else {
        setIsAuthorized(true);
    }

    setIsLoading(false);
}, [navigate, location]);


  if (isLoading) {
    return <div className="flex min-h-screen justify-center items-center">Loading...</div>;
  }

  if (!isAuthorized) {
    return null; // O renderizar un mensaje de acceso denegado
  }

  return (
    <div className="flex min-h-screen">
      <Aside />
      <div className="flex-1 bg-orange-100">
        <Header />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmpleadoLayout;
