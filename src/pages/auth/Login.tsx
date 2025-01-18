import { Link } from 'react-router-dom';
import '../../img/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="form-overlay">
        <div className="form-container bg-gradient-to-br from-orange-950 via-orange-700 to-orange-800 bg-opacity-95 p-8 rounded-md shadow-md max-w-sm w-full mx-4 my-6 border border-orange-600/30">
          <h1 className="text-3xl font-bold text-orange-100 mb-6 text-center">Inicio de sesión</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-md font-medium text-orange-100 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Ingresa tu email"
                className="block w-full px-3 py-2 border border-orange-600/50 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 bg-orange-950/90 text-orange-100 placeholder-orange-300/50"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-md font-medium text-orange-100 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Ingresa tu contraseña"
                className="block w-full px-3 py-2 border border-orange-600/50 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 bg-orange-950/90 text-orange-100 placeholder-orange-300/50"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
              <Link to="/Registro" className="text-md text-orange-200 hover:text-orange-100 hover:underline">
                ¿No tienes cuenta? Regístrate
              </Link>
              <button
                type="submit"
                className="w-full sm:w-auto bg-orange-500 text-white py-2 px-4 text-md rounded-md hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-50 shadow-md hover:shadow-orange-500/30"
              >
                <Link to="/">Acceder</Link> 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
