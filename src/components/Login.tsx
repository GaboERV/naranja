import '../img/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="form-overlay">
        <div className="form-container bg-transparent backdrop-blur-md p-10 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-white mb-8">Inicio de sesión</h1>
          <form>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Agregar texto"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-medium text-white mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Agregar texto"
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div className="flex justify-between items-center mb-6 gap-2">
              <a href="#" className="text-lg text-orange-500 hover:underline">
                ¿No tienes cuenta? Regístrate
              </a>
              <button
                type="submit"
                className="bg-orange-500 text-white py-3 px-6 text-lg rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
