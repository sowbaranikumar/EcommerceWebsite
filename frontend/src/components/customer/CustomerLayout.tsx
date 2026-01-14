// import type {ReactNode} from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";


const Layout=()=>{
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* <Navbar /> */}
   <div className="flex flex-1 overflow-hidden">
        <Sidebar />
   <main className="flex-1 bg-[#f6f5fb] overflow-y-auto p-6">
          <Outlet />
   </main>
      </div>

      {/* <Footer /> */}
    </div>
  );
};
export default Layout;
