import React, { useState } from "react";
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
  name: string;
  email: string;
  role: string;
  workload: number;
}

interface Team {
  id: number;
  name: string;
  members: Member[];
  project: string;
}

const Equipos = () => {
  console.log("Equipos component rendered");

  const [teams, setTeams] = useState<Team[]>([]);
  const [teamName, setTeamName] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [showEditTeamForm, setShowEditTeamForm] = useState<boolean>(false);
  const [editTeamData, setEditTeamData] = useState<{ name: string } | null>(
    null
  );

  const addTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    const newTeam: Team = {
      id: Date.now(),
      name: teamName,
      members: [],
      project: "Sin asignar",
    };

    setTeams([...teams, newTeam]);
    setTeamName("");
    setShowCreateForm(false);
  };

  const deleteTeam = (
    e: React.MouseEvent<HTMLButtonElement>,
    teamId: number
  ) => {
    e.stopPropagation();
    setTeams(teams.filter((team) => team.id !== teamId));
    setSelectedTeamId(null);
  };

  const handleTeamClick = (team: Team) => {
    console.log("handleTeamClick - team:", team);
    setSelectedTeamId(team.id);
    console.log("selectedTeamId after click", team.id);
  };

  const handleCloseTeamDetails = () => {
    setSelectedTeamId(null);
  };

  const handleUpdateTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editTeamData?.name || !selectedTeamId) {
      console.log("Missing required data:", { editTeamData, selectedTeamId });
      return;
    }

    // Create a new array with the updated team
    const updatedTeams = teams.map((team) =>
      team.id === selectedTeamId ? { ...team, name: editTeamData.name } : team
    );

    // Update state and localStorage
    setTeams(updatedTeams);

    // Reset form state
    setShowEditTeamForm(false);
    setEditTeamData(null);
  };

  const handleEditTeam = (
    e: React.MouseEvent<HTMLButtonElement>,
    team: Team
  ) => {
    e.stopPropagation();
    setSelectedTeamId(team.id); // Make sure to set the selectedTeamId
    setEditTeamData({ name: team.name });
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
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
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
            <form onSubmit={addTeam}>
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
              <form onSubmit={handleUpdateTeam}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Nombre del equipo
                  </label>
                  <input
                    type="text"
                    value={editTeamData.name}
                    onChange={(e) => setEditTeamData({ name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-md"
                    name="name"
                    placeholder="Ingrese el nombre del equipo"
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
                <span className="text-white font-medium">{team.name}</span>
                <button className="text-white">
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-gray-600">
                  <FolderOpen size={16} />
                  <span>{team.project}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={16} />
                  <span>{team.members.length} miembros</span>
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

      {filteredTeams.length === 0 && !selectedTeamId && (
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
    name: "",
    email: "",
    role: "",
    workload: 0,
  });
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showEditMemberForm, setShowEditMemberForm] = useState<boolean>(false);
  const [editMemberData, setEditMemberData] = useState<Member | null>(null);
  const selectedTeam = teams.find((team) => team.id === selectedTeamId);

  if (!selectedTeam) {
    return <div>No team selected</div>;
  }

  const addMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMember: Member = {
      id: Date.now(),
      ...newMemberData,
    };

    const updatedTeams = teams.map((t) => {
      if (t.id === selectedTeam.id) {
        return { ...t, members: [...t.members, newMember] };
      }
      return t;
    });

    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));

    setNewMemberData({ name: "", email: "", role: "", workload: 0 });
    setShowMemberForm(false);
  };

  const deleteMember = (
    e: React.MouseEvent<HTMLButtonElement>,
    memberId: number
  ) => {
    e.stopPropagation();

    if (!selectedTeam) return;

    const updatedTeams = teams.map((t) => {
      if (t.id === selectedTeam.id) {
        return {
          ...t,
          members: t.members.filter((member) => member.id !== memberId),
        };
      }
      return t;
    });

    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
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

  const handleUpdateMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editMemberData || !selectedTeam) return;

    const updatedTeams = teams.map((t) => {
      if (t.id === selectedTeam.id) {
        return {
          ...t,
          members: t.members.map((m) =>
            m.id === editMemberData.id ? editMemberData : m
          ),
        };
      }
      return t;
    });

    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setShowEditMemberForm(false);
    console.log("showEditMemberForm", false);
    setEditMemberData(null);
    console.log("editMemberData", null);
  };

  const handleCloseEditMemberForm = () => {
    setShowEditMemberForm(false);
    console.log("showEditMemberForm", false);
    setEditMemberData(null);
    console.log("editMemberData", null);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{selectedTeam.name}</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          X
        </button>
      </div>

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
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selectedTeam.members.map((member) => (
              <tr key={member.id}>
                <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{member.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {member.workload}
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
            <form onSubmit={handleUpdateMember}>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={editMemberData.name}
                  onChange={(e) =>
                    setEditMemberData({
                      ...editMemberData,
                      name: e.target.value,
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
                  value={editMemberData.email}
                  onChange={(e) =>
                    setEditMemberData({
                      ...editMemberData,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">Rol</label>
                <input
                  type="text"
                  value={editMemberData.role}
                  onChange={(e) =>
                    setEditMemberData({
                      ...editMemberData,
                      role: e.target.value,
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
                  value={editMemberData.workload}
                  onChange={(e) =>
                    setEditMemberData({
                      ...editMemberData,
                      workload: Number(e.target.value),
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
      {/* Formulario para añadir miembros */}
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
                  value={newMemberData.name}
                  onChange={(e) =>
                    setNewMemberData({ ...newMemberData, name: e.target.value })
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
                  value={newMemberData.email}
                  onChange={(e) =>
                    setNewMemberData({
                      ...newMemberData,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1 border rounded-md"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-sm mb-1">Rol</label>
                <input
                  type="text"
                  value={newMemberData.role}
                  onChange={(e) =>
                    setNewMemberData({ ...newMemberData, role: e.target.value })
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
                  value={newMemberData.workload}
                  onChange={(e) =>
                    setNewMemberData({
                      ...newMemberData,
                      workload: Number(e.target.value),
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
