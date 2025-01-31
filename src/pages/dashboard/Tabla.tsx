import React, { useEffect, useState } from "react";

interface DataItem {
  nombre: string;
  fechaInicio: string;
  estado: string | null;
}

const Tabla: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/Proyecto");
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor.");
        }
        const result: DataItem[] = await response.json();

        // Formatear fecha antes de actualizar el estado
        const formattedData = result.map((item) => ({
          ...item,
          fechaInicio: new Date(item.fechaInicio).toLocaleDateString("es-MX"),
          estado: item.estado ?? "Desconocido", // Si estado es null, asignar "Desconocido"
        }));

        setData(formattedData);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 w-full">
      <h3 className="text-lg font-bold text-gray-700 mb-6">Registros de Proyectos</h3>

      {loading && <p className="text-gray-600 text-center">Cargando...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && data.length === 0 && (
        <p className="text-gray-600 text-center">No hay registros disponibles.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-orange-600 to-orange-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">Nombre</th>
                <th className="py-3 px-6 text-left font-semibold">Fecha de Inicio</th>
                <th className="py-3 px-6 text-left font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-orange-50"
                  } hover:bg-orange-100 transition-colors duration-150`}
                >
                  <td className="py-3 px-6 text-gray-600">{item.nombre}</td>
                  <td className="py-3 px-6 text-gray-600">{item.fechaInicio}</td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      item.estado === "Activo"
                        ? "text-green-600"
                        : item.estado === "Pendiente"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tabla;
