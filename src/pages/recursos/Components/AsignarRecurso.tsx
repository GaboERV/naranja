import React, { useState } from "react";

interface AssignResourceModalProps {
  isOpen: boolean;
  resourceName: string;
  onClose: () => void;
  onAssignResource: (
    assignmentDate: string,
    releaseDate: string,
    team: string
  ) => void;
}

const AsignarRecurso: React.FC<AssignResourceModalProps> = ({
  isOpen,
  resourceName,
  onClose,
  onAssignResource,
}) => {
  const [assignmentDate, setAssignmentDate] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [team, setTeam] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (assignmentDate.trim() && releaseDate.trim() && team.trim()) {
      onAssignResource(assignmentDate, releaseDate, team);
      setAssignmentDate("");
      setReleaseDate("");
      setTeam("");
      onClose();
    } else {
      alert("Todos los campos son obligatorios.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">
          Asignar recurso: {resourceName}{" "}
          <span className="text-sm text-gray-500">status: inactivo</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Fecha de asignación</label>
              <input
                type="text"
                value={assignmentDate}
                onChange={(e) => setAssignmentDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Fecha de asignación"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Fecha de liberación</label>
              <input
                type="text"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Fecha de liberación"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Equipo</label>
            <input
              type="text"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Ingrese el equipo"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AsignarRecurso;
