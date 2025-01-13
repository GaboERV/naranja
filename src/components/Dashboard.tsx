import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="bg-orange-200 w-1/4 p-4 flex flex-col overflow-y-auto">
        <h1 className="text-orange-700 text-2xl font-bold mb-10 text-center">Naranja</h1>
        <button
          className="flex items-center space-x-2 text-orange-700 font-medium bg-orange-300 p-4 rounded hover:bg-orange-400 mb-6"
          onClick={() => window.location.reload()}
        >
          <span>Inicio</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-white p-4 overflow-y-auto">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <Link className="bg-orange-500 text-white px-4 py-2 rounded" to={"/"}>User</Link>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-bold text-center mb-4">Proyectos realizados</h3>
            <p className="text-4xl font-bold text-center">20</p>
          </div>
          <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-bold text-center mb-4">Tareas realizadas</h3>
            <p className="text-4xl font-bold text-center">10</p>
          </div>
          <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-bold text-center mb-4">Total gastado</h3>
            <p className="text-4xl font-bold text-center">$20 MXN</p>
          </div>
          <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-bold text-center mb-4">Clases</h3>
            <div className="flex justify-center space-x-2">
              {"LMMJV".split("").map((day) => (
                <div
                  key={day}
                  className="bg-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-full text-sm"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4">
          <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-bold mb-4 text-center">Porcentaje de asistencias</h3>
            <div className="flex items-center justify-center">
              <div className="w-40 h-40 bg-orange-400 rounded-full flex items-center justify-center relative">
                <span className="text-white text-3xl font-bold">65%</span>
              </div>
              <div className="ml-4 flex flex-col space-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <p className="text-xs">Porcentaje de asistencias</p>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-200 rounded-full mr-2"></div>
                  <p className="text-xs">Porcentaje de faltas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-bold mb-4 text-center">Alumnos</h3>
            <table className="w-full text-xs rounded-lg overflow-hidden">
              <thead className="bg-orange-300">
                <tr>
                  <th className="py-2 px-4 text-left text-white">Nombre</th>
                  <th className="py-2 px-4 text-left text-white">Email</th>
                  <th className="py-2 px-4 text-left text-white">Teléfono</th>
                  <th className="py-2 px-4 text-left text-white">Dirección</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "User1", email: "hoA@gmail.com", phone: "98873663", address: "Calle 10" },
                  { name: "User2", email: "hoA@gmail.com", phone: "98873663", address: "Calle 10" },
                  { name: "User3", email: "hoA@gmail.com", phone: "98873663", address: "Calle 10" },
                ].map((user, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-orange-50"
                    } hover:bg-orange-100`}
                  >
                    <td className="py-2 px-4 text-left">{user.name}</td>
                    <td className="py-2 px-4 text-left">{user.email}</td>
                    <td className="py-2 px-4 text-left">{user.phone}</td>
                    <td className="py-2 px-4 text-left">{user.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
