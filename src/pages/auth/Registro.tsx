import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../img/Login.css';

interface RegisterData {
    nombre: string;
    email: string;
    contrasena: string;
    direccion: string;
    telefono: string;

}

interface ErrorResponse {
    message: string;
}

function Registro() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError('');

        const userData: RegisterData = {
            nombre: name,
            email: email,
            contrasena: password,
            direccion: address,
            telefono: phone,
        };

        try {
            const response = await fetch('http://localhost:3000/auth/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData: ErrorResponse = await response.json();
                setError(errorData.message || 'Error al registrar el usuario');
                return;
            }

            navigate('/login');
        } catch (err) {
            setError('Error de red al intentar registrar el usuario.');
        }
    };

    return (
        <div className="login-container">
            <div className="form-overlay">
                <div className="form-container bg-gradient-to-br from-orange-950 via-orange-700 to-orange-800 bg-opacity-95 p-8 rounded-lg shadow-lg max-w-4xl mx-auto my-8 border border-orange-600/30">
                    <h1 className="text-4xl font-bold text-orange-100 mb-8 text-center">Registro empresa</h1>
                    <form onSubmit={handleSubmit}>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Primera columna */}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-lg font-medium text-orange-100 mb-2">
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Ingresa tu nombre completo"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="block w-full px-4 py-3 text-base border border-orange-600/50 rounded-lg shadow-md focus:ring-orange-400 focus:border-orange-400 bg-orange-950/90 text-orange-100 placeholder-orange-300/50"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-lg font-medium text-orange-100 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Ingresa tu email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full px-4 py-3 text-base border border-orange-600/50 rounded-lg shadow-md focus:ring-orange-400 focus:border-orange-400 bg-orange-950/90 text-orange-100 placeholder-orange-300/50"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-lg font-medium text-orange-100 mb-2">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Ingresa tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full px-4 py-3 text-base border border-orange-600/50 rounded-lg shadow-md focus:ring-orange-400 focus:border-orange-400 bg-orange-950/90 text-orange-100 placeholder-orange-300/50"
                                    />
                                </div>
                            </div>

                            {/* Segunda columna */}
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="phone" className="block text-lg font-medium text-orange-100 mb-2">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="Ingresa tu número de teléfono"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="block w-full px-4 py-3 text-base border border-orange-600/50 rounded-lg shadow-md focus:ring-orange-400 focus:border-orange-400 bg-orange-950/90 text-orange-100 placeholder-orange-300/50"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-lg font-medium text-orange-100 mb-2">
                                        Dirección
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        placeholder="Ingresa tu dirección"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="block w-full px-4 py-3 text-base border border-orange-600/50 rounded-lg shadow-md focus:ring-orange-400 focus:border-orange-400 bg-orange-950/90 text-orange-100 placeholder-orange-300/50"
                                    />
                                </div>

                                <div>
                                   
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col items-center gap-4">
                                <div className="flex space-x-4">
                                  <Link to="/login" className="text-md text-orange-200 hover:text-orange-100 hover:underline">
                                    ¿Ya tienes cuenta? Inicia sesión
                                  </Link>
                                  
                              </div>
                                 <button
                                   type="submit"
                                    className="w-full sm:w-auto bg-orange-500 text-white py-3 px-6 text-lg rounded-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50 shadow-lg hover:shadow-orange-500/30 font-semibold transition-all duration-200"
                                   >
                                   Registrarse
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Registro;