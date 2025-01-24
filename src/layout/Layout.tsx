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
    const token = localStorage.getItem('token');
    const tokenEmpleado = localStorage.getItem('token-empleado');
      
    const isAuthenticated = !!(token || tokenEmpleado);
      
      setIsAuthorized(isAuthenticated);

      if (!isAuthenticated && !location.pathname.startsWith('/login')){
          navigate('/login');
      }else{
        setIsLoading(false);
      }

  }, [navigate, location]);

  if (isLoading) {
    return <div className="flex min-h-screen justify-center items-center">Loading...</div>;
  }

    if (!isAuthorized) {
        return null; // Or render a specific unauthorized message or redirect
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