import { Link } from "react-router-dom";
import { navigationItems } from "./navigationItems"; // Para administradores
import { navigationItemsEmpleado } from "./navigationItemsEmpleado"; // Para empleados

// Define el tipo para un elemento de navegación
interface NavigationItem {
    path: string;
    text: string;
}

const Aside: React.FC = () => {
    const token = localStorage.getItem('token'); // Token de administrador
    const tokenEmpleado = localStorage.getItem('token-empleado'); // Token de empleado

    let items: NavigationItem[] = [];

    // Verificar autenticación y asignar la barra de navegación correspondiente
    if (token && !tokenEmpleado) {
        items = navigationItems; // Mostrar navegación de administradores
    } else if (!token && tokenEmpleado) {
        items = navigationItemsEmpleado; // Mostrar navegación de empleados
    }

    return (
        <aside className="w-64 bg-gradient-to-b from-orange-900 to-orange-700 h-screen py-8 px-6 flex flex-col overflow-y-auto">
            <h1 className="text-orange-50 text-3xl font-bold mb-12 text-center">
                StuEmpresa
            </h1>

            {items.length > 0 ? (
                items.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center space-x-3 text-orange-50 font-medium bg-orange-800/40 p-4 rounded-lg hover:bg-orange-800/60 transition-all duration-200 shadow-lg mb-2"
                    >
                        <span>{item.text}</span>
                    </Link>
                ))
            ) : (
                <p className="text-orange-50 text-center">Acceso restringido</p>
            )}
        </aside>
    );
}

export default Aside;
