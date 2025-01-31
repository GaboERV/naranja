import React, { useEffect, useState } from "react";

interface DataState {
  descripcion1: string;
  progreso: number;
  descripcion2: string;
  recursos: number;
}

const Contenido = () => {
  
        
        

   
  

  return (
<div className="grid grid-cols-4 gap-3">
  <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 mx-4 lg:mx-1">
    <h3 className="text-base font-semibold text-gray-600 mb-3">Proyectos realizados</h3>
    <p className="text-3xl font-bold text-orange-600">20</p>
  </div>

  <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 mx-4 lg:mx-1">
    <h3 className="text-base font-semibold text-gray-600 mb-3">Proyectos pendientes</h3>
    <p className="text-3xl font-bold text-orange-600">20</p>
  </div>

  <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 mx-4 lg:mx-1">
    <h3 className="text-base font-semibold text-gray-600 mb-3">Recursos disponibles</h3>
    <p className="text-3xl font-bold text-orange-600">30/50</p>
  </div>

  <div className="bg-white p-10 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 mx-4 lg:mx-1">
    <h3 className="text-base font-semibold text-gray-600 mb-3">Equipos trabajando</h3>
    <p className="text-3xl font-bold text-orange-600">30/50</p>
  </div>
</div>

  );
};

export default Contenido;
