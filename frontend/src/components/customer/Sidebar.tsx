import { NavLink } from "react-router-dom";
import {Store,Home,Package} from "lucide-react";

const Sidebar=()=>{
  return (
    <div className="w-60 bg-[#2c333d] text-white flex flex-col">
      <h4 className=" h-20 text-xl font-bold text-white flex items-center px-6">MyStore</h4>
      <nav className="flex flex-col p-4 space-y-5">
        <NavLink
            to="/home" end className={({ isActive })=>`flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors
            ${isActive? "bg-white text-black" : "text-white hover:bg-white/10 hover:text-white"}`
          }
        >
          <span>Home</span>
          <Home size={18}/>
        </NavLink>

        <NavLink to="/home/store"
          className={({ isActive }) =>`flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors
            ${isActive?"bg-white text-black" : "text-white hover:bg-white/10 hover:text-white"}`
          }
        >
          <span>Store</span>
          <Store size={18}/>
        </NavLink>

        <NavLink to="/home/order"
          className={({ isActive }) =>`flex items-center justify-between w-full px-4 py-2 rounded-md transition-colors
          ${isActive ? "bg-white text-black" : "text-white hover:bg-white/10 hover:text-white"}`
          }
        >
          <span>Orders</span>
          <Package size={18}/>
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
