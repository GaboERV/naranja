import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../img/Login.css';

interface LoginResponse {
    id: number;
    nombre: string;
    email: string;
}

interface ErrorResponse {
    message: string;
}

function LoginEmpleado() {
    const [email, setEmail] = useState<string>('');
    const [clavePublica, setclavePublica] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/auth/login-public-key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, clavePublica }),
            });

            console.log('Raw Response:', response);

            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                console.error('Login Error:', errorData);
                setError(errorData.message || 'Error al iniciar sesión');
                return;
            }

            const data: LoginResponse = await response.json();
            console.log('Parsed Data:', data);

            localStorage.setItem('token-empleado', JSON.stringify(data));
            navigate('/Empleados');

        } catch (err) {
            console.error('Fetch Error:', err);
            setError('Error de red al intentar iniciar sesión.');
        }
    };

    return (
        <div className="login-container">
            <div className="form-overlay">
                <div className="form-container bg-gradient-to-br from-orange-950 via-orange-700 to-orange-800 bg-opacity-95 p-8 rounded-md shadow-md max-w-sm w-full mx-4 my-6 border border-orange-600/30">
                    <h1 className="text-3xl font-bold text-orange-100 mb-6 text-center">Inicio de sesión Empleado</h1>
                    <form onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 mb-4">{error}</p>}

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-md font-medium text-orange-100 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Ingresa tu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-3 py-2 border border-orange-600/50 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 bg-orange-950/90 text-orange-100 placeholder-orange-300/50"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="clavePublica" className="block text-md font-medium text-orange-100 mb-1">
                                Clave Pública
                            </label>
                            <input
                                type="text"
                                id="clavePublica"
                                placeholder="Ingresa tu clave pública"
                                value={clavePublica}
                                onChange={(e) => setclavePublica(e.target.value)}
                                className="block w-full px-3 py-2 border border-orange-600/50 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 bg-orange-950/90 text-orange-100 placeholder-orange-300/50"
                            />
                        </div>
                        <div className="mt-6 flex flex-col items-center gap-2">
                                <div className="flex flex-col items-begin mb-2 gap-2">
                                    <Link
                                        to="/Registro"
                                        className="text-md text-orange-200 hover:text-orange-100 hover:underline"
                                    >
                                        ¿No tienes cuenta? Regístrate
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="text-md text-orange-200 hover:text-orange-100 hover:underline"
                                    >
                                        ¿Ya tienes cuenta? Inicia sesión
                                    </Link>
                                </div>
                             <button
                              type="submit"
                                className="w-full sm:w-auto bg-orange-500 text-white py-2 px-4 text-md rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50 shadow-md hover:shadow-orange-500/30"
                              >
                              Acceder
                           </button>
                          </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginEmpleado;