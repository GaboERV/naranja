import { Outlet,} from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";

const Layout = () => {
  



  return (
    <div className="flex min-h-screen">
      <Aside/>

      <div className="flex-1  bg-orange-100">
        <Header/>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
