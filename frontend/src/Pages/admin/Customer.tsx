// import customers from "../../data/customers.json";
// import type { StoreProduct } from "../../types/storeproducts";
// import store from "../../data/store.json";
import type { Customer } from "../../types/Customer"
import { useState, useEffect } from "react";
import { getAllCustomers } from "../../services/customerApi";


const DashboardCustomer = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async ()=>{
      try {
        const data = await getAllCustomers();
        console.log("API response",data);
        setCustomers(data);
      } 
      catch (error) {
        console.error("Error fetching customers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) 
  return <p>Loading customers...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-700">
        Customer Dashboard
      </h1>

      <p className="mt-4 text-gray-600 mb-8">
        Welcome to the Customer dashboard
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left text-gray-700 font-medium">Customers</th>
              <th className="py-2 px-4 text-left text-gray-700 font-medium">Email</th>
              <th className="py-2 px-4 text-left text-gray-700 font-medium">Phone</th>
              <th className="py-2 px-4 text-left text-gray-700 font-medium">Stores</th>
              <th className="py-2 px-4 text-left text-gray-700 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b text-gray-600 hover:bg-gray-50"
              >
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">{customer.email}</td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.storeName}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${customer.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {customer.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DashboardCustomer;
