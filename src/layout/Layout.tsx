import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Aside from './Aside';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Token para administradores
    const tokenEmpleado = localStorage.getItem('token-empleado'); // Token para empleados
    const isAuthenticated = !!(token || tokenEmpleado);

    if (!isAuthenticated) {
      if (!location.pathname.startsWith('/login')) {
        navigate('/login');
      }
    } else {
      // Verificar que el usuario acceda solo a su área correspondiente
      if (token && location.pathname.startsWith('/Empleados')) {
        navigate('/unauthorized'); // Ruta de acceso denegado
      } else if (tokenEmpleado && location.pathname.startsWith('/')) {
        navigate('/unauthorized'); // Ruta de acceso denegado
      } else {
        setIsAuthorized(true);
      }
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

export default Layout;
