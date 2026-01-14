// import {useState} from 'react';
// import { Link } from "react-router-dom";
// import {NavLink} from "react-router-dom";
// const Navbar=()=>{
//     const [open,setOpen]=useState(false);
//     return(
//         <nav className="relative flex items-center bg-blue-600 px-5 py-3">

//          <div onClick={()=>setOpen(!open)} className="cursor-pointer space-y-1">
//            <div className="h-1 w-6 bg-white"></div>
//            <div className="h-1 w-6 bg-white"></div>
//            <div className="h-1 w-6 bg-white"></div>
//          </div>
       

//           <h2 className="ml-4 text-white text-xl font-semibold">MyStore</h2>

//           {open&&(
//         <ul className="absolute left-0 top-14 w-60 bg-blue-600 shadow-md h-screen">
//         <li className="cursor-pointer px-4 py-4 text-white hover:bg-white">
//           {/* <Link to="/store" onClick={()=>setOpen(false)}  className="text-white hover:text-black block no-underline">Store</Link> */}
//            <NavLink to="/store"
//               className={({isActive})=>
//               isActive?"text-black font-bold":"text-white"}>Store</NavLink>
//         </li>
//         <li className="cursor-pointer px-4 py-4 text-white hover:bg-white">
//           {/* <Link to="/order" onClick={()=>setOpen(false)} className="text-white hover:text-black block no-underline">Order</Link> */}
//               <NavLink to="/order" className={({isActive})=>isActive?"text-black font-bold":"text-white"}>Orders</NavLink>
//         </li>
//         <li className="cursor-pointer px-4 py-4 hover:bg-white">
//           {/* <Link to="/" onClick={()=>setOpen(false)}  className="text-white hover:text-black block no-underline">Home</Link> */}
//            <NavLink to="/" className={({isActive})=>isActive?"text-black font-bold":"text-white"}>Home</NavLink>
//         </li>
//         </ul>
//      )}
//         </nav>
//     );
// };
const Navbar=()=>{
  return(
    <nav className="h-14 bg-white border-b flex items-center px-6">
      <h2 className="text-xl font-semibold text-gray-500">MyStore</h2>
    </nav>
  );
};

export default Navbar;

