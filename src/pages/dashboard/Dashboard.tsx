import Contenido from "./Contenido";
import Grafica from "./Grafica";
import Tabla from "./Tabla";

const Dashboard = () => {
  return (
    <>
      <section className=" ">
        <Contenido />
      </section>

      <section className="mt-8 grid  lg:grid-cols-2 gap-3">
        <Grafica />

        <Tabla />
      </section>
    </>
  );
};

export default Dashboard;