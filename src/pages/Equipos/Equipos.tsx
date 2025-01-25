import React, { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  MoreVertical,
  FolderOpen,
  Users,
  X,
} from "lucide-react";

interface Member {
  id: number;
  nombre: string;
  correo: string;
  especialidad: string;
  cargaTrabajo: number;
  contrasena: string;
}
interface Proyecto {
  nombre: string;
}

interface Team {
  id: number;
  nombre: string;
  funcion?: string;
  empresaId: number;
  proyecto: Proyecto;
  miembros: Member[];
  
}

const Equipos = () => {
  console.log("Equipos component rendered");

  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [showEditTeamForm, setShowEditTeamForm] = useState<boolean>(false);
  const [editTeamData, setEditTeamData] = useState<{
    name: string;
    funcion?: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const tokenEmpleado = localStorage.getItem("token-empleado");
  const isAuthenticated = !!(token || tokenEmpleado);
  const [empresaId, setEmpresaId] = useState<number | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const decodedToken = decodeToken();
      setEmpresaId(decodedToken?.id || null);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (empresaId) {
      fetchTeams();
    }
  }, [empresaId]);

  const decodeToken = () => {
    try {
      if (token) {
        return JSON.parse(token);
      }
      if (tokenEmpleado) {
        return JSON.parse(tokenEmpleado);
      }
      return null;
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  };

  const fetchTeams = async () => {
    if (!empresaId) return;
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/equipo/empresa/${empresaId}`
      );

      if (!response.ok) {
        throw new Error(`Error fetching teams: ${response.status}`);
      }
      const data = await response.json();
      console.log("data", data);
      setTeams(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const createTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teamName.trim() || !empresaId) {
      setError("Nombre de equipo y empresa son obligatorios");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/equipo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: teamName,
          empresaId: empresaId,
          funcion: editTeamData?.funcion || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || `Error creating team: ${response.status}`
        );
        return;
      }

      fetchTeams();
      setTeamName("");
      setShowCreateForm(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteTeam = async (
    e: React.MouseEvent<HTMLButtonElement>,
    teamId: number
  ) => {
    e.stopPropagation();
    try {
      const response = await fetch(`http://localhost:3000/equipo/${teamId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || `Error deleting team: ${response.status}`
        );
        return;
      }
      fetchTeams();
      setSelectedTeamId(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleTeamClick = (team: Team) => {
    console.log("handleTeamClick - team:", team);
    setSelectedTeamId(team.id);
    console.log("selectedTeamId after click", team.id);
  };

  const handleCloseTeamDetails = () => {
    setSelectedTeamId(null);
  };

  const updateTeam = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editTeamData?.name || !selectedTeamId) {
      console.log("Missing required data:", { editTeamData, selectedTeamId });
      setError("Faltan datos");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/equipo/${selectedTeamId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: editTeamData.name,
            funcion: editTeamData?.funcion || null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || `Error updating team: ${response.status}`
        );
        return;
      }

      fetchTeams();
      setShowEditTeamForm(false);
      setEditTeamData(null);
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleEditTeam = (
    e: React.MouseEvent<HTMLButtonElement>,
    team: Team
  ) => {
    e.stopPropagation();
    setSelectedTeamId(team.id); // Make sure to set the selectedTeamId
    setEditTeamData({
      name: team.nombre ?? "",
      funcion: team.funcion,
    });
    setShowEditTeamForm(true);
  };
  const handleCloseEditTeamForm = () => {
    console.log("handleCloseEditTeamForm called");
    setShowEditTeamForm(false);
    console.log("showEditTeamForm", false);
    setEditTeamData(null);
    console.log("editTeamData", null);
  };

  const filteredTeams = teams.filter((team) =>
    team.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow overflow-y-auto h-[85vh]">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {!selectedTeamId && (
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Equipos</h1>
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-gray-100 rounded-md w-64"
            />
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              {showCreateForm ? "Cancelar" : "Crear equipo"}
            </button>
          </div>
        </div>
      )}
      {loading && <div className="text-center">Cargando...</div>}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              onClick={() => setShowCreateForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Crear nuevo equipo</h2>
            <form onSubmit={createTeam}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Nombre del equipo
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Ingrese el nombre del equipo"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Funcion</label>
                <input
                  type="text"
                  value={editTeamData?.funcion}
                  onChange={(e) =>
                    setEditTeamData({
                      ...editTeamData,
                      name: editTeamData?.name || "",
                      funcion: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-md"
                  placeholder="Ingrese la funcion del equipo"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Crear equipo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEditTeamForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              onClick={handleCloseEditTeamForm}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Editar equipo</h2>
            {editTeamData && (
              <form onSubmit={updateTeam}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Nombre del equipo
                  </label>
                  <input
                    type="text"
                    value={editTeamData.name}
                    onChange={(e) =>
                      setEditTeamData({ ...editTeamData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-md"
                    name="name"
                    placeholder="Ingrese el nombre del equipo"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Funcion</label>
                  <input
                    type="text"
                    value={editTeamData?.funcion}
                    onChange={(e) =>
                      setEditTeamData({
                        ...editTeamData,
                        funcion: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md"
                    placeholder="Ingrese la funcion del equipo"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={handleCloseEditTeamForm}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  >
                    Actualizar equipo
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {selectedTeamId ? (
        <TeamDetails
          selectedTeamId={selectedTeamId}
          onClose={handleCloseTeamDetails}
          teams={teams}
          setTeams={setTeams}
          onEditTeam={handleEditTeam}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTeams.map((team: Team) => (
            <div
              key={team.id}
              className="bg-amber-50 rounded-lg shadow overflow-hidden cursor-pointer"
              onClick={() => handleTeamClick(team)}
            >
              <div className="bg-orange-500 p-3 flex justify-between items-center">
                <span className="text-white font-medium">{team.nombre}</span>
                <button className="text-white">
                  <MoreVertical size={20}/>
                </button>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <FolderOpen size={16} />
                  <span> {team.proyecto?.nombre|| "sin asignar" }</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={16} />
                  <span>{team.miembros?.length || 0} miembros</span>
                </div>
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={(e) => handleEditTeam(e, team)}
                  >
                    <Edit2 size={18} className="text-gray-600" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      deleteTeam(e, team.id)
                    }
                  >
                    <Trash2 size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredTeams.length === 0 && !selectedTeamId && !loading && (
        <div className="text-center text-gray-500 mt-8">
          No hay equipos disponibles. Crea uno nuevo para empezar.
        </div>
      )}
    </div>
  );
};

interface TeamDetailsProps {
  selectedTeamId: number | null;
  onClose: () => void;
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  onEditTeam: (e: React.MouseEvent<HTMLButtonElement>, team: Team) => void;
}

const TeamDetails: React.FC<TeamDetailsProps> = ({
  selectedTeamId,
  onClose,
  teams,
  setTeams,
}) => {
  console.log("TeamDetails component rendered");
  const [newMemberData, setNewMemberData] = useState({
    nombre: "",
    correo: "",
    especialidad: "",
    cargaTrabajo: 0,
    contrasena: "",
  });
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showEditMemberForm, setShowEditMemberForm] = useState<boolean>(false);
  const [editMemberData, setEditMemberData] = useState<Member | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const selectedTeam = teams.find((team) => team.id === selectedTeamId);
  const token = localStorage.getItem("token");
  const tokenEmpleado = localStorage.getItem("token-empleado");
  const isAuthenticated = !!(token || tokenEmpleado);

  const [empresaId, setEmpresaId] = useState<number | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      const decodedToken = decodeToken();
      setEmpresaId(decodedToken?.id || null);
    }
  }, [isAuthenticated]);

  const decodeToken = () => {
    try {
      if (token) {
        return JSON.parse(token);
      }
      if (tokenEmpleado) {
        return JSON.parse(tokenEmpleado);
      }
      return null;
    } catch (error) {
      console.error("Error parsing token:", error);
      return null;
    }
  };
  if (!selectedTeam) {
    return <div>No team selected</div>;
  }

  useEffect(() => {
    
    fetchMembers();
  }, [selectedTeamId]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      let url = `http://localhost:3000/miembro`;
      if (selectedTeamId) {
        url = `http://localhost:3000/miembro/equipo/${selectedTeamId}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching members: ${response.status}`);
      }
      const data = await response.json();
      const filteredMembers = data.filter(
        (member: any) => member.equipoId === selectedTeam.id
      );
      const updatedTeams = teams.map((t) => {
        if (t.id === selectedTeam.id) {
          return { ...t, miembros: filteredMembers };
        }
        return t;
      });
      setTeams(updatedTeams);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedTeam) return;
    try {
      const response = await fetch("http://localhost:3000/miembro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newMemberData,
          equipoId: selectedTeam.id,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || `Error creating member: ${response.status}`
        );
        return;
      }
      fetchMembers();
      setNewMemberData({
        nombre: "",
        correo: "",
        especialidad: "",
        cargaTrabajo: 0,
        contrasena: "",
      });
      setShowMemberForm(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteMember = async (
    e: React.MouseEvent<HTMLButtonElement>,
    memberId: number
  ) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:3000/miembro/${memberId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || `Error deleting member: ${response.status}`
        );
        return;
      }
      fetchMembers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEditMember = (
    e: React.MouseEvent<HTMLButtonElement>,
    member: Member
  ) => {
    console.log("handleEditMember called", member);
    e.stopPropagation();
    setEditMemberData(member);
    console.log("editMemberData", member);
    setShowEditMemberForm(true);
    console.log("showEditMemberForm", true);
  };

  const updateMember = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editMemberData || !selectedTeam) return;

    try {
      const response = await fetch(
        `http://localhost:3000/miembro/${editMemberData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editMemberData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        setError(
          errorData.message || `Error updating member: ${response.status}`
        );
        return;
      }
      fetchMembers();
      setShowEditMemberForm(false);
      setEditMemberData(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleCloseEditMemberForm = () => {
    setShowEditMemberForm(false);
    console.log("showEditMemberForm", false);
    setEditMemberData(null);
    console.log("editMemberData", null);
  };

  return (
    <div className="mt-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{selectedTeam.nombre}</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          X
        </button>
      </div>
      {loading && <div className="text-center">Cargando...</div>}
      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Especialidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Carga de trabajo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correo
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contraseña
                </th>

                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {selectedTeam.miembros?.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.especialidad}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.cargaTrabajo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.correo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {member.contrasena}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={(e) => handleEditMember(e, member)}
                    >
                      <Edit2 size={16} className="text-gray-600" />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                        deleteMember(e, member.id)
                      }
                    >
                      <Trash2 size={16} className="text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        onClick={() => setShowMemberForm(true)}
        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
      >
        Añadir miembro
      </button>
      {showEditMemberForm && editMemberData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              onClick={handleCloseEditMemberForm}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h3 className="text-lg font-bold mb-2">Editar miembro</h3>
            <form onSubmit={updateMember}>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={editMemberData.nombre}
                  onChange={(e) =>
                    setEditMemberData({
                      ...editMemberData,
                      nombre: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editMemberData.correo}
                  onChange={(e) =>
                    setEditMemberData({
                      ...editMemberData,
                      correo: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Especialidad
                </label>
                <input
                  type="text"
                  value={editMemberData.especialidad}
                  onChange={(e) =>
                    setEditMemberData({
                      ...editMemberData,
                      especialidad: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Carga de Trabajo
                </label>
                <input
                  type="number"
                  value={editMemberData.cargaTrabajo}
                  onChange={(e) =>
                    setEditMemberData({
                      ...editMemberData,
                      cargaTrabajo: Number(e.target.value),
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={editMemberData.contrasena}
                  onChange={(e) =>
                    setEditMemberData({
                      ...editMemberData,
                      contrasena: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseEditMemberForm}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Actualizar miembro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showMemberForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              onClick={() => setShowMemberForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h3 className="text-lg font-bold mb-2">Añadir nuevo miembro</h3>
            <form onSubmit={addMember}>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={newMemberData.nombre}
                  onChange={(e) =>
                    setNewMemberData({
                      ...newMemberData,
                      nombre: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newMemberData.correo}
                  onChange={(e) =>
                    setNewMemberData({
                      ...newMemberData,
                      correo: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Especialidad
                </label>
                <input
                  type="text"
                  value={newMemberData.especialidad}
                  onChange={(e) =>
                    setNewMemberData({
                      ...newMemberData,
                      especialidad: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Carga de Trabajo
                </label>
                <input
                  type="number"
                  value={newMemberData.cargaTrabajo}
                  onChange={(e) =>
                    setNewMemberData({
                      ...newMemberData,
                      cargaTrabajo: Number(e.target.value),
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={newMemberData.contrasena}
                  onChange={(e) =>
                    setNewMemberData({
                      ...newMemberData,
                      contrasena: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMemberForm(false)}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-200 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                >
                  Añadir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Equipos;
