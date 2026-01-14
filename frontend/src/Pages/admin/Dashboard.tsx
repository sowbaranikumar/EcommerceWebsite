// const Dashboard=()=>{
//   return(
//     <div>
//       <h1 className="text-2xl font-bold text-gray-700">
//         Admin Dashboard
//       </h1>

//       <p className="mt-4 text-gray-600">
//         Welcome to the admin dashboard
//       </p>
//     </div>
//   );
// };

// export default Dashboard;

import { UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/logout";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="max-w-8xl mx-auto px-4 pt-8 pb-8 bg-white min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-700">
          Admin Dashboard
        </h1>

        <div className="flex items-center gap-2">
          <UserCircle size={28} className="text-gray-800" />
          <span className="text-gray-700 font-medium">Admin</span>

          <button
            className="ml-6 bg-gray-500 text-white px-4 py-1 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <p className="mt-4 text-gray-600">
        Welcome to the admin dashboard
      </p>
    </div>
  );
};

export default Dashboard;

