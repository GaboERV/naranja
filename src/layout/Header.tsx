import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
  nombre?: string;
  email?: string;
  id?: number;
  Enable2FA?: boolean;
}

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Nueva variable para verificar si es admin

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenEmpleado = localStorage.getItem('token-empleado');
    const isAuthenticated = token || tokenEmpleado;

    if (isAuthenticated) {
      try {
        const parsedToken = JSON.parse(isAuthenticated) as UserData;
        setUserData(parsedToken);
        setIs2FAEnabled(parsedToken?.Enable2FA || false);
        
        // Verifica si el usuario es admin (si tiene el token de administrador)
        setIsAdmin(!!token);

      } catch (error) {
        console.error('Error parsing token:', error);
        setUserData(null);
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-empleado');
    navigate('/login');
  };

  const handleToggle2FA = async () => {
    if (!userData?.id || !isAdmin) return; // Evita que empleados activen/desactiven 2FA
    try {
      const response = await fetch(
        `http://localhost:3000/auth/toggle2fa/${userData.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setIs2FAEnabled(data.Enable2FA);

    } catch (error) {
      console.error('Error enabling 2FA:', error);
    }
  };

  return (
    <header className="flex items-center justify-end h-16 bg-[#ffffff] text-black px-4 shadow">
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 text-black focus:outline-none"
          >
            {userData?.nombre || 'Usuario'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              {/* Mostrar la opción de 2FA solo si es admin */}
              {isAdmin && (
                <button
                  onClick={handleToggle2FA}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {is2FAEnabled ? 'Deshabilitar 2FA' : 'Habilitar 2FA'}
                </button>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
