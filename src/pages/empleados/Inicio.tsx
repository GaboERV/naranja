import { useState } from "react";

const Inicio = () => {
  const [searchTeam, setSearchTeam] = useState("");
  const [searchResource, setSearchResource] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const teams = [
    { name: "Equipo 1", members: 7 },
    { name: "Equipo 2", members: 7 },
    { name: "Equipo 3", members: 7 },
    { name: "Equipo 4", members: 7 },
  ];

  const resources = [
    { name: "Computadora 1", assigned: "1/01/2XXX", released: "16/01/2XXX" },
    { name: "Computadora 2", assigned: "1/01/2XXX", released: "16/01/2XXX" },
    { name: "Computadora 3", assigned: "1/01/2XXX", released: "16/01/2XXX" },
    { name: "Computadora 4", assigned: "1/01/2XXX", released: "16/01/2XXX" },
    { name: "Computadora 5", assigned: "1/01/2XXX", released: "16/01/2XXX" },
    { name: "Computadora 6", assigned: "1/01/2XXX", released: "16/01/2XXX" },
  ];

  const teamMembers = [
    { name: "Miembro 1", specialty: "Análisis de datos", workload: 2 },
    { name: "Miembro 2", specialty: "Análisis de datos", workload: 2 },
    { name: "Miembro 3", specialty: "Análisis de datos", workload: 2 },
    { name: "Miembro 4", specialty: "Análisis de datos", workload: 2 },
    { name: "Miembro 5", specialty: "Análisis de datos", workload: 2 },
    { name: "Miembro 6", specialty: "Análisis de datos", workload: 2 },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow overflow-y-auto h-[85vh]">
      <h2 className="text-2xl font-semibold mb-4">Proyecto 1</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Equipos */}
        <div className="bg-orange-100 p-4 rounded-lg shadow-md">
          <h3 className="font-medium text-lg">Equipos</h3>
          <input
            type="text"
            placeholder="Buscar"
            className="w-full mt-2 mb-4 p-2 border rounded-md shadow-sm"
            value={searchTeam}
            onChange={(e) => setSearchTeam(e.target.value)}
          />
          <div className="space-y-3">
            {teams
              .filter((team) =>
                team.name.toLowerCase().includes(searchTeam.toLowerCase())
              )
              .map((team, index) => (
                <div
                  key={index}
                  className="p-4 bg-white shadow-md rounded-lg cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setSelectedTeam(team.name)}
                >
                  <p className="font-medium">{team.name}</p>
                  <p className="text-gray-600">{team.members} miembros</p>
                </div>
              ))}
          </div>
        </div>

        {/* Recursos */}
        <div className="bg-orange-100 p-4 rounded-lg shadow-md ">
          <h3 className="font-medium text-lg">Recursos</h3>
          <input
            type="text"
            placeholder="Buscar"
            className="w-full mt-2 mb-4 p-2 border rounded-md shadow-sm"
            value={searchResource}
            onChange={(e) => setSearchResource(e.target.value)}
          />
          <table className="w-full border-collapse table-fixed">
            <thead>
              <tr className="text-left">
                <th className="p-2">Recurso</th>
                <th className="p-2">Fecha de asignación</th>
                <th className="p-2">Fecha de liberación</th>
              </tr>
            </thead>
            <tbody>
              {resources
                .filter((resource) =>
                  resource.name
                    .toLowerCase()
                    .includes(searchResource.toLowerCase())
                )
                .map((resource, index) => (
                  <tr
                    key={index}
                    className={`p-2 ${
                      index % 2 === 0 ? "bg-orange-200" : "bg-white"
                    }`}
                  >
                    <td className="p-2 font-medium">{resource.name}</td>
                    <td className="p-2">{resource.assigned}</td>
                    <td className="p-2">{resource.released}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-1/2 relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold mr-6 mt-3"
              onClick={() => setSelectedTeam(null)}
            >
              X
            </button>
            <h3 className="text-xl font-semibold">{selectedTeam}</h3>
            <div className="bg-orange-100 p-4 rounded-lg shadow-md mt-4">
              <h4 className="font-medium mb-2">Miembros del equipo</h4>
              <table className="w-full border-collapse table-fixed">
                <thead>
                  <tr className="text-left">
                    <th className="p-2">Nombre</th>
                    <th className="p-2">Especialidad</th>
                    <th className="p-2">Carga de trabajo</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member, index) => (
                    <tr
                      key={index}
                      className={`p-2 ${
                        index % 2 === 0 ? "bg-orange-200" : "bg-white"
                      }`}
                    >
                      <td className="p-2 font-medium">{member.name}</td>
                      <td className="p-2">{member.specialty}</td>
                      <td className="p-2">{member.workload}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inicio;
