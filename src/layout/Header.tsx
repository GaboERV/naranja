import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserData {
    nombre?: string;
}

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
    
      if(token) {
        try {
            const parsedToken = JSON.parse(token) as UserData
          setUserData(parsedToken)
          console.log(parsedToken)
        }catch(error) {
            console.error('Error parsing token:', error)
            setUserData(null)
        }
      }
    }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-empleado');
      navigate('/login')
  };

  return (
    <header className="flex items-center justify-end h-16 bg-[#ffffff] text-black px-4 shadow">
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 text-black focus:outline-none"
          > {userData?.nombre || 'Usuario'}
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