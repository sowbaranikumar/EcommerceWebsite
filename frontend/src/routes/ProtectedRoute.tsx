import { Navigate } from "react-router-dom";
import type {ReactNode} from "react";
import { useEffect ,useState} from "react";
interface ProtectedRouteProps {
  children:ReactNode;
  allowedRoles?:("ADMIN" | "CUSTOMER")[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const [authorized, setAuthorized] = useState<boolean|null>(null);
    const token = localStorage.getItem("Accesstoken");
    const role = localStorage.getItem("role") as "ADMIN"|"CUSTOMER"|null;
          useEffect(()=>{
          if (!token) {
           setAuthorized(false);
           }
           else if (allowedRoles && role && !allowedRoles.includes(role)) {
           setAuthorized(false);
          }
          else
          setAuthorized(true);
  },[token,role]);
  
  if(authorized===null)
  return null;
  if (!authorized) 
  return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
