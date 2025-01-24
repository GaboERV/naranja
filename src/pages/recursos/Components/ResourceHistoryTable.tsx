import React from 'react';

interface Resource {
  projectName: string;
  type: string;
  id: number;
  estado: string;
}

interface ResourceHistoryTableProps {
  resources: Resource[];
  onClose: () => void;
}

const ResourceHistoryTable: React.FC<ResourceHistoryTableProps> = ({ resources, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-[90%] w-[90%]  max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Historial de Recursos</h2>
                 <button
                onClick={onClose}
                    className="text-gray-600 hover:text-gray-800 focus:outline-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                </button>
             </div>

        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nombre del Proyecto</th>
              <th className="py-2 px-4 border-b">Tipo</th>
              <th className="py-2 px-4 border-b">Estado</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((resource, index) => (
              <tr key={resource.id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                <td className="py-2 px-4 border-b">{resource.id}</td>
                <td className="py-2 px-4 border-b">{resource.projectName}</td>
                <td className="py-2 px-4 border-b">{resource.type}</td>
                <td className="py-2 px-4 border-b">{resource.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceHistoryTable;