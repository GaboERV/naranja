import React, { useState, useEffect } from "react";

interface CreateResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateOrUpdateResource: (
    projectName: string,
    type: string,
      details: string,
    id?: number
  ) => void;
  initialProjectName?: string;
  initialType?: string;
  initialDetails?: string;
  isEditMode?: boolean;
  resourceId?: number
}

const CreateResourceModal: React.FC<CreateResourceModalProps> = ({
  isOpen,
  onClose,
  onCreateOrUpdateResource,
  initialProjectName = "",
  initialType = "",
   initialDetails="",
    isEditMode= false,
     resourceId = 0,
}) => {
  const [projectName, setProjectName] = useState(initialProjectName);
  const [type, setType] = useState(initialType);
  const [details, setDetails] = useState(initialDetails)

  //Actualizamos el estado de los campos cuando cambian las props
   useEffect(() => {
     setProjectName(initialProjectName);
     setType(initialType);
      setDetails(initialDetails);
  }, [initialProjectName, initialType, initialDetails]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (projectName.trim() && type.trim() && details.trim()) {
        onCreateOrUpdateResource(projectName, type, details, resourceId); // Llama a la función para crear el recurso
        setProjectName(""); // Resetea los campos
        setType("");
      setDetails("");
      onClose(); // Cierra el modal
    } else {
      alert("Todos los campos son obligatorios.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4">{isEditMode ? "Editar recurso" : "Crear nuevo recurso"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Nombre del proyecto</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Ingrese el nombre del proyecto"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tipo de recurso</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Ingrese el tipo de recurso"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Detalles</label>
            <input
              type="text"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Ingrese los detalles del recurso"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              {isEditMode ? "Guardar cambios" : "Crear recurso"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateResourceModal;