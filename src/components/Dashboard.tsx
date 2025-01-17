import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-orange-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-orange-900 to-orange-700 h-full py-8 px-6 flex flex-col overflow-y-auto">
        <h1 className="text-orange-50 text-3xl font-bold mb-12 text-center">
          Naranja
        </h1>

        <button
          className="flex items-center space-x-3 text-orange-50 font-medium bg-orange-800/40 p-4 rounded-lg hover:bg-orange-800/60 transition-all duration-200 shadow-lg"
          onClick={() => window.location.reload()}
        >
          <span>Inicio</span>
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-orange-900">Dashboard</h2>
          <Link 
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition-all duration-200 shadow-md font-medium"
            to={"/"}
          >
            User
          </Link>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">
              Proyectos realizados
            </h3>
            <p className="text-4xl font-bold text-orange-600">20</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">
              Tareas realizadas
            </h3>
            <p className="text-4xl font-bold text-orange-600">10</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">
              Total gastado
            </h3>
            <p className="text-4xl font-bold text-orange-600">$20 MXN</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-sm font-semibold text-gray-600 mb-4">Clases</h3>
            <div className="flex justify-center space-x-2">
              {"LMMJV".split("").map((day) => (
                <div
                  key={day}
                  className="bg-gradient-to-br from-orange-600 to-orange-500 text-white w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium shadow-md"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-lg font-bold text-gray-700 mb-6">
              Porcentaje de asistencias
            </h3>
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 bg-gradient-to-br from-orange-600 to-orange-400 rounded-full flex items-center justify-center relative shadow-lg">
                <span className="text-white text-4xl font-bold">65%</span>
              </div>
              <div className="ml-8 flex flex-col space-y-3">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mr-3 shadow"></div>
                  <p className="text-sm text-gray-600">Porcentaje de asistencias</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-200 rounded-full mr-3 shadow"></div>
                  <p className="text-sm text-gray-600">Porcentaje de faltas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-lg font-bold text-gray-700 mb-6">Alumnos</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-orange-600 to-orange-500">
                  <tr>
                    <th className="py-3 px-6 text-left text-white font-semibold">Nombre</th>
                    <th className="py-3 px-6 text-left text-white font-semibold">Email</th>
                    <th className="py-3 px-6 text-left text-white font-semibold">Teléfono</th>
                    <th className="py-3 px-6 text-left text-white font-semibold">Dirección</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "User1",
                      email: "hoA@gmail.com",
                      phone: "98873663",
                      address: "Calle 10",
                    },
                    {
                      name: "User2",
                      email: "hoA@gmail.com",
                      phone: "98873663",
                      address: "Calle 10",
                    },
                    {
                      name: "User3",
                      email: "hoA@gmail.com",
                      phone: "98873663",
                      address: "Calle 10",
                    },
                  ].map((user, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-orange-50"
                      } hover:bg-orange-100 transition-colors duration-150`}
                    >
                      <td className="py-3 px-6 text-gray-600">{user.name}</td>
                      <td className="py-3 px-6 text-gray-600">{user.email}</td>
                      <td className="py-3 px-6 text-gray-600">{user.phone}</td>
                      <td className="py-3 px-6 text-gray-600">{user.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;