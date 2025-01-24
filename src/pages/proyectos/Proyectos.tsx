import React, { useState } from 'react';

interface Project {
  id: number;
  name: string;
  description: string;
  teams: string;
  startDate: string;
  status: string;
}

const Proyectos: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    teams: '',
    startDate: '',
    status: '',
  });
   const [searchQuery, setSearchQuery] = useState('');

  const handleCreateProject = () => {
    const id = projects.length + 1;
    const project: Project = {
      id,
      name: newProject.name,
      description: newProject.description,
      teams: `Equipos asignados: ${newProject.teams}`,
      startDate: `Fecha de inicio: ${newProject.startDate}`,
      status: 'Status: pendiente',
    };
    setProjects([...projects, project]);
    setIsModalOpen(false);
    setNewProject({ name: '', description: '', teams: '', startDate: '', status: '' });
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleFinishProject = (id: number) => {
    setProjects(projects.map(project => 
      project.id === id 
        ? { ...project, status: 'Status: Finalizado' }
        : project
    ));
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name,
      description: project.description,
      teams: project.teams.replace('Equipos asignados: ', ''),
      startDate: project.startDate.replace('Fecha de inicio: ', ''),
      status: project.status.replace('Status: ', ''),
    });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleUpdateProject = () => {
    if (!editingProject) return;

    setProjects(projects.map(project =>
      project.id === editingProject.id
        ? {
            ...project,
            name: newProject.name,
            description: newProject.description,
            teams: `Equipos asignados: ${newProject.teams}`,
            startDate: `Fecha de inicio: ${newProject.startDate}`,
            status: `Status: ${newProject.status || 'pendiente'}`,
          }
        : project
    ));
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingProject(null);
    setNewProject({ name: '', description: '', teams: '', startDate: '', status: '' });
  };


    const filteredProjects = projects.filter(project => {
        const search = searchQuery.toLowerCase()
        return (
          project.name.toLowerCase().includes(search) ||
          project.description.toLowerCase().includes(search) ||
          project.teams.toLowerCase().includes(search)
        );
      });


  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow overflow-y-auto h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <div className="flex gap-4">
          <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-gray-100 rounded-md w-64"
            />
             <button
            className="bg-orange-500 text-white font-medium rounded px-4 py-2 hover:bg-orange-600 focus:outline-none"
            onClick={() => {
              setIsEditMode(false);
              setNewProject({ name: '', description: '', teams: '', startDate: '', status: '' });
              setIsModalOpen(true);
            }}
          >
            Crear proyecto
          </button>
            </div>
        </div>

        {/* Empty State Message */}
        {filteredProjects.length === 0 && projects.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <p className="text-gray-400">No hay proyectos disponibles.Crea uno nuevo para empezar</p>
          </div>
        )}

         {filteredProjects.length === 0 && projects.length > 0 && (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <p className="text-gray-400">No se encontraron proyectos con ese nombre</p>
          </div>
        )}

        {/* Projects */}
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-amber-100 p-4 rounded shadow-sm mb-4 flex flex-col relative"
          >
            <h2 className="text-lg font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-700 mb-1">{project.description}</p>
            <p className="text-gray-700 mb-1">{project.teams}</p>
            <p className="text-gray-700 mb-1">{project.startDate}</p>
            <p className="text-gray-700">{project.status}</p>
            <div className="absolute right-4 top-4 flex flex-col gap-2">
              <button 
                className="bg-orange-500 text-white font-medium rounded px-3 py-1 hover:bg-orange-600 focus:outline-none"
                onClick={() => handleFinishProject(project.id)}
              >
                Finalizar
              </button>
              <button 
                className="bg-orange-500 text-white font-medium rounded px-3 py-1 hover:bg-orange-600 focus:outline-none"
                onClick={() => handleEditClick(project)}
              >
                Editar
              </button>
              <button 
                className="bg-orange-500 text-white font-medium rounded px-3 py-1 hover:bg-orange-600 focus:outline-none"
                onClick={() => handleDeleteProject(project.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 w-1/2">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? 'Editar Proyecto' : 'Crear Proyecto'}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Nombre de proyecto</label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Descripción de proyecto</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Seleccionar equipos</label>
              <input
                type="text"
                value={newProject.teams}
                onChange={(e) => setNewProject({ ...newProject, teams: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Fecha de inicio</label>
              <input
                type="date"
                value={newProject.startDate}
                onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
            {isEditMode && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <input
                  type="text"
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
            )}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditMode(false);
                  setEditingProject(null);
                  setNewProject({ name: '', description: '', teams: '', startDate: '', status: '' });
                }}
                className="bg-gray-400 text-white font-medium rounded px-4 py-2 hover:bg-gray-500 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                onClick={isEditMode ? handleUpdateProject : handleCreateProject}
                className="bg-orange-500 text-white font-medium rounded px-4 py-2 hover:bg-orange-600 focus:outline-none"
              >
                {isEditMode ? 'Guardar cambios' : 'Crear proyecto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proyectos;