import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyAuthentication: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token'); // Obtener el token de la URL
    const userId = searchParams.get('id'); // Obtener la ID de la URL

    if (token && userId) {
      verifyToken(token, userId); // Llamar a la función con ambos datos
    } else {
      setError('Token o ID de usuario no encontrados.');
    }
  }, [searchParams]);

  const verifyToken = async (token: string, userId: string) => {
    try {
      const response = await fetch('http://localhost:3000/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, userId: Number(userId) }), // Convertir userId a número
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al verificar el token.');
      }

      const result = await response.json();
      setMessage('Verificación exitosa, redirigiendo...');

      // Guardar datos en localStorage
      localStorage.setItem('token', JSON.stringify(result));

      // Redirigir al usuario a la página principal
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err: any) {
      setError(err.message); // Mostrar el mensaje de error
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VerifyAuthentication;
