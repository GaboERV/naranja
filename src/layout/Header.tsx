import { Link, useLocation } from "react-router-dom";
import { navigationItems } from "./navigationItems";

const Header = ()=>{
    const location = useLocation();
    return( <header className="flex items-center justify-end h-16 bg-[#ffffff] text-black px-4">
         

        <div className="flex items-center gap-4">
          <span>
            {navigationItems.find((item) => item.path === location.pathname)
              ?.text || "Dashboard"}
          </span>
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#282A33]">
              <Link to="/login" >a</Link>
          </div>
        </div>
      </header>);
}
export default Header;