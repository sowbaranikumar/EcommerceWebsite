import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Store from "./Pages/customer/Store";
import Login from "./Pages/customer/Login";
import Dashboard from "./Pages/admin/Dashboard";
import Home from "./Pages/customer/Home";
import Layout from "./components/customer/CustomerLayout";
import DashboardLayout from "./components/admin/DashboardLayout";
import { useState } from 'react';
import DashboardStore from "./Pages/admin/Store";
import DashboardCustomer from "./Pages/admin/Customer";
import CartPage from "./Pages/customer/Cart";
import OrdersPage from "./Pages/customer/OrdersPage";
import ProtectedRoute from "./routes/ProtectedRoute";

export const App = () => {
  // const [isCustomer] = useState(true);

  return (
    <BrowserRouter>
  <Routes>

    <Route path="/" element={<Navigate to="/login" replace />} />

    <Route path="/login" element={<Login />} />


    <Route
      path="/home"
      element={
        <ProtectedRoute allowedRoles={["CUSTOMER"]}>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Home />} />
      <Route path="store" element={<Store />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="order" element={<OrdersPage />} />
    </Route>


    <Route
      path="/dashboard"
      element={
        <ProtectedRoute allowedRoles={["ADMIN"]}>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Dashboard />} />
      <Route path="store" element={<DashboardStore />} />
      <Route path="customer" element={<DashboardCustomer />} />
    </Route>

  </Routes>
</BrowserRouter>

  );
};

export default App; 
