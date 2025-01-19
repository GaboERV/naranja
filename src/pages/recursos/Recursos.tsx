import React, { useState } from "react";
import { fecha } from "./Components/fecha";
import CreateResourceModal from "./Components/Buttonrecursos";
import { Edit2, Trash2 } from "lucide-react";
import ResourceHistoryTable from "./Components/ResourceHistoryTable";
import AssignResourceModal from "./Components/AsignarRecurso";

function Recursos() {
    const hoy = new Date();
    const fechaFormateada = fecha(hoy, "dd/mm/yy");

    const [showCreateResourceForm, setShowCreateResourceForm] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [resourceToEdit, setResourceToEdit] = useState<{
        projectName: string;
        type: string;
        id: number;
        details: string;
    } | null>(null);
    const [resources, setResources] = useState<
        { projectName: string; type: string; id: number; estado: string; details: string }[]
    >([]);
    const [resourceToDelete, setResourceToDelete] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showHistory, setShowHistory] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedResource, setSelectedResource] = useState<{ projectName: string; } | null>(null);


    const addOrUpdateResource = (projectName: string, type: string, details: string, id?: number) => {
        if (id) {
            setResources((prevResources) =>
                prevResources.map((resource) =>
                    resource.id === id ? { ...resource, projectName, type, details } : resource
                )
            );
        } else {
            const newResource = {
                projectName,
                type,
                id: resources.length + 1,
                details: details,
                estado: "Disponible",
            };
            setResources((prevResources) => [...prevResources, newResource]);
        }
        setIsEditMode(false);
        setResourceToEdit(null);
    };
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    const handleEditResource = (resource: any) => {
        setResourceToEdit(resource);
        setShowCreateResourceForm(true);
        setIsEditMode(true);
    };

    const handleDeleteResource = (id: number) => {
        setResources((prevResources) =>
            prevResources.filter((resource) => resource.id !== id)
        );
        setResourceToDelete(null);
    };
    const filteredResources = resources.filter(resource =>
        resource.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleShowHistory = () => {
        setShowHistory(true);
    };

    const handleCloseHistory = () => {
        setShowHistory(false);
    };
     const handleResourceDoubleClick = (resource: any) => {
        setSelectedResource(resource);
        setShowAssignModal(true);
    };
    const handleAssignResource = (
        assignmentDate: string,
        releaseDate: string,
        team: string
    ) => {
    // Aquí puedes manejar la lógica de asignación del recurso
    console.log(
      "Asignar recurso:",
      selectedResource?.projectName,
      "con fecha de asignación:",
      assignmentDate,
      ", fecha de liberación:",
      releaseDate,
      "y equipo:",
      team
    );
    setShowAssignModal(false);
  };


    return (
        <div className="flex justify-center items-center">
            <section className="bg-white px-8 py-12 rounded-xl shadow-lg max-w-[1200px] w-[90%] mx-auto mt-14 min-h-[650px] flex flex-col">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold">Recursos</h1>
                    <div className="flex items-center gap-4 flex-1">
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="p-3 border rounded-md w-full max-w-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <p className="text-lg font-medium text-gray-600 whitespace-nowrap">{fechaFormateada}</p>
                    </div>
                    <button
                        onClick={() => setShowCreateResourceForm(true)}
                        className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors"
                    >
                        Crear recurso
                    </button>
                </div>

                {/* Modal */}
                <CreateResourceModal
                    isOpen={showCreateResourceForm}
                    onClose={() => setShowCreateResourceForm(false)}
                    onCreateOrUpdateResource={addOrUpdateResource}
                    initialProjectName={resourceToEdit?.projectName}
                    initialType={resourceToEdit?.type}
                    initialDetails={resourceToEdit?.details}
                    isEditMode={isEditMode}
                    resourceId={resourceToEdit?.id}
                />

                {/* Tarjetas */}
                <div className="flex-grow mt-6">
                    {filteredResources.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredResources.map((resource) => (
                                <div
                                    key={resource.id}
                                    className="bg-amber-50 rounded-lg shadow overflow-hidden cursor-pointer"
                                     onDoubleClick={() => handleResourceDoubleClick(resource)}
                                >
                                    <div className="bg-orange-500 p-3 flex justify-between items-center">
                                        <span className="text-white font-medium">{resource.projectName}</span>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <div
                                            className={`mt-2 px-2 py-1 rounded-md text-center ${resource.estado === "Disponible"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {resource.estado}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <span>{resource.type}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <span>{resource.details}</span>
                                        </div>
                                           <div className="flex justify-end gap-2 mt-2">
                                            <button
                                                className="p-1 hover:bg-gray-100 rounded"
                                                onClick={() => handleEditResource(resource)}
                                            >
                                              <Edit2 size={18} className="text-gray-600" />
                                            </button>
                                            <button
                                              className="p-1 hover:bg-gray-100 rounded"
                                               onClick={() => handleDeleteResource(resource.id)}
                                            >
                                            <Trash2 size={18} className="text-gray-600" />
                                           </button>
                                         </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center min-h-[300px]">
                            <p className="text-gray-500 text-center">
                                {resources.length > 0
                                    ? "No hay recursos con ese nombre."
                                    : "No hay recursos. Crea un nuevo recurso"}
                            </p>
                        </div>
                    )}
                </div>

                {/* Ver historial */}
                <div className="flex justify-end mt-auto">
                    <button
                        onClick={handleShowHistory}
                        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                    >
                        Ver historial
                    </button>
                    {showHistory && (
                        <ResourceHistoryTable
                            resources={resources}
                            onClose={handleCloseHistory}
                        />
                    )}
                     {showAssignModal && selectedResource && (
                        <AssignResourceModal
                            isOpen={showAssignModal}
                             resourceName={selectedResource.projectName}
                            onClose={() => setShowAssignModal(false)}
                             onAssignResource={handleAssignResource}
                        />
                    )}
                </div>
            </section>
        </div>

    );
}

export default Recursos;