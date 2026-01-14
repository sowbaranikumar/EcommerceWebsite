
import {UserCircle} from "lucide-react";
import {useNavigate} from "react-router-dom";
import { logout } from "../../utils/logout";
const Home=()=>{
  const navigate=useNavigate();
    const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  return (
   
    <div className="max-w-8xl mx-auto px-4 pt-8 pb-8 bg-white min-h-screen">
        {/* <h2 className="text-3xl font-bold text-gray-600 items-center">
          Home Page
        </h2> */}
        {/* <p className="mb-4 text-gray-600">
          Welcome to the home page
        </p> */}
        <div className="flex items-center justify-between w-full mb-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-700">Home page</h2>
        
        <div className="flex items-center gap-2">
          <UserCircle size={28} className="text-gray-800" />
          <span className="text-gray-700 text-bold font-medium">Customer</span>
          <button className="ml-6 bg-gray-500 text-white border-gray-800"
            onClick={handleLogout}> 
            Logout
        </button>
        </div>
        </div>
      <main className="flex-1 flex  justify-center">
        <div className="w-full max-w-6xl p-6">
       
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-lg bg-gray-500 p-5 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">Store</h2>
            <p className="text-white-500">Browse all products</p>
          </div>
          
          <div className="rounded-lg bg-gray-500 p-5 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-white-500">View your order history</p>
          </div>

          <div className="rounded-lg bg-gray-500 p-5 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">Profile</h2>
            <p className="text-white-500">Manage your account</p>
          </div>
        </div>
      </div>
      </main> 
    </div>
  );
};

export default Home;
