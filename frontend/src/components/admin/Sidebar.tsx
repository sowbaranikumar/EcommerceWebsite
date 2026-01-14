import { NavLink } from "react-router-dom";
import { LayoutDashboard,Store,Users} from "lucide-react";

const Sidebar =() => {
  return (
    <div className="w-60 bg-[#2c333d] text-white flex flex-col">
       <h4 className=" h-20 text-xl font-bold text-white flex items-center px-6">MyStore</h4>
      <nav className="flex-1 p-4">
        <ul className="space-y-6">
          <li>
            <NavLink end
              to="/dashboard" className={({isActive })=> `flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors
            ${isActive ? "bg-white text-black" : "text-white hover:bg-white/10 hover:text-white"}`
              }

            ><span>Dashboard</span>
            <LayoutDashboard size={18}/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/store"
              className={({ isActive }) => `flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors
            ${isActive ? "bg-white text-black" : " text-white hover:bg-white/10 hover:text-white"}`
              }>
              <span>Stores</span>
              <Store size={18}/>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/customer"
              className={({ isActive }) => `flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors
            ${isActive ? "bg-white text-black" : "text-white hover:bg-white/10 hover:text-white"}`
              }>
              <span>Customers</span>
              <Users size={18}/>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
