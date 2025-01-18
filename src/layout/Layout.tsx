import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  const navigationItems = [
    { path: "/", text: "Dashboard" },
    { path: "/Proyectos", text: "Proyectos" },
    { path: "/Equipos", text: "Equipos" },
    { path: "/Recursos", text: "Recursos" },
  ];

  return (
    <div className="flex min-h-screen">
    <aside className="w-64 bg-gradient-to-b from-orange-900 to-orange-700 h-screen py-8 px-6 flex flex-col overflow-y-auto">
      <h1 className="text-orange-50 text-3xl font-bold mb-12 text-center">
        StuEmpresa
      </h1>

      {navigationItems.map((item) => (
        <Link
        key={item.path}
        to={item.path}
        className="flex items-center space-x-3 text-orange-50 font-medium bg-orange-800/40 p-4 rounded-lg hover:bg-orange-800/60 transition-all duration-200 shadow-lg mb-2"
        >
        <span>{item.text}</span>
        </Link>
      ))}
    </aside>

      <div className="flex-1  bg-orange-100">
        <header className="flex items-center justify-end h-16 bg-[#ffffff] text-black px-4">
         

          <div className="flex items-center gap-4">
            <span>
              {navigationItems.find((item) => item.path === location.pathname)
                ?.text || "Dashboard"}
            </span>
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#282A33]">
                <Link to="/login" >a</Link>
            </div>
          </div>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
