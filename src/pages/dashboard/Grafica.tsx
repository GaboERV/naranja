import React, { useState, useRef, useEffect } from "react";

interface ChartState {
  chartData: number[];
  labels: string[];
  tooltipContent: string;
  tooltipOpen: boolean;
  tooltipX: number;
  tooltipY: number;
}

const Grafica: React.FC = () => {
  const [state, setState] = useState<ChartState>({
    chartData: new Array(12).fill(0), // Inicialmente, todos los valores en 0
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    tooltipContent: "",
    tooltipOpen: false,
    tooltipX: 0,
    tooltipY: 0,
  });

  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.tooltipOpen && tooltipRef.current) {
      tooltipRef.current.focus();
    }
  }, [state.tooltipOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/Proyecto");
        const data = await response.json();
        const totalRegistros = data.length;

        // Distribuir equitativamente en los 12 meses
        const registrosMensuales = new Array(12).fill(0);
        for (let i = 0; i < totalRegistros; i++) {
          registrosMensuales[i % 12] += 1;
        }

        setState((prevState) => ({
          ...prevState,
          chartData: registrosMensuales,
        }));
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const showTooltip = (e: React.MouseEvent<HTMLDivElement>, value: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setState((prevState) => ({
      ...prevState,
      tooltipContent: value.toString(),
      tooltipX: rect.left + rect.width / 2,
      tooltipY: rect.top - 30,
      tooltipOpen: true,
    }));
  };

  const hideTooltip = () => {
    setState((prevState) => ({
      ...prevState,
      tooltipContent: "",
      tooltipOpen: false,
    }));
  };

  return (
    <div>
      <div className="max-w-4xl w-full">
        <div className="shadow-lg p-6 rounded-lg bg-white mb-15">
          <div className="flex justify-between items-center mb-40">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Proyectos realizados este año</h2>
              <p className="text-gray-600 text-sm">Promedio mensual</p>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-600 rounded-full mr-2"></div>
              <span className="text-sm text-gray-700">Registros</span>
            </div>
          </div>

          <div className="relative my-8">
            {state.tooltipOpen && (
              <div
                ref={tooltipRef}
                className="absolute z-10 shadow-md bg-white text-xs p-2 rounded-lg text-gray-800 font-semibold"
                style={{
                  left: `${state.tooltipX}px`,
                  top: `${state.tooltipY}px`,
                  transform: "translateX(-50%)",
                }}
              >
                Registros: {state.tooltipContent}
              </div>
            )}

            <div className="flex items-end space-x-4 justify-center">
              {state.chartData.map((value, index) => (
                <div key={index} className="w-1/12 flex flex-col items-center">
                  <div
                    className="bg-orange-600 hover:bg-orange-400 transition-all relative cursor-pointer w-8 rounded-md"
                    style={{ height: `${value * 5}px` }}
                    onMouseEnter={(e) => showTooltip(e, value)}
                    onMouseLeave={hideTooltip}
                  >
                    <div className="absolute top-0 left-0 right-0 -mt-6 text-xs text-gray-800 text-center">
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-400 mt-2"></div>

            <div className="flex justify-between text-xs text-gray-700 mt-2">
              {state.labels.map((label, index) => (
                <div key={index} className="w-1/12 text-center">{label}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grafica;
