import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verifyEmail(token);
    } else {
      setError('Token de verificación no encontrado.');
    }
  }, [searchParams]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/auth/verify-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al verificar el correo electrónico.');
      }

      setMessage('Correo electrónico verificado con éxito.');
      setTimeout(() => {
        navigate('/login');
      }, 5000); // Redirigir a /login después de 5 segundos
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default VerifyEmail;