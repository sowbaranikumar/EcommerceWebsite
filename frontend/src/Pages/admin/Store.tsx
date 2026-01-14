// import store from "../../data/store.json";
import { useEffect, useState } from "react";
import type { StoreProduct } from "../../types/storeproducts";
import Modal from "../../components/admin/Modal";
import AddStore from "../../components/admin/AddStore.tsx";
import { UserCircle, Users } from "lucide-react";
import StatCard from "../../components/admin/StatCard";
import arrow from "../../assets/arrow.svg";
import piechart from "../../assets/piechart.svg";
import Rainbow from "../../assets/Rainbow.svg";
// import customers from "../../data/customers.json";
import { getAllStores, deleteStore, getStoreCustomers, createStore } from "../../services/storeApi.ts";
// import type { Customer } from "../../types/Customer.ts";

const DashboardStore = () => {
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [storeCustomers, setStoreCustomers] = useState<any[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await getAllStores();
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching stores", err);
        setError("Failed to load stores");
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleViewCustomers = async (storeId: number) => {
    // setSelectedStoreId(storeId);
    setLoadingCustomers(true);
    setIsViewModalOpen(true);
    setStoreCustomers([]);
    try {
      const res = await getStoreCustomers(storeId);
      console.log("APi Response", res);
      console.log("store data", res.data);
      setStoreCustomers(res.data.customers || []);
      console.log("Customers data", res.data.customers);
    } catch (error) {
      console.error("Failed to fetch customers", error);
      setStoreCustomers([]);
    } finally {
      setLoadingCustomers(false);
    }
  };


  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;
    const matchesSearch =
      product.name?.toLowerCase().includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  })
  const categories = ["All",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  const handleCreateStore = async () => {
    if (!selectedProduct) return;
    if (!selectedProduct.name || !selectedProduct.category) {
      alert("Store name and category are required");
      return;
    }
    try {
      // const payload = {
      //   name: selectedProduct.name,
      //   category: selectedProduct.category,
      //   status: selectedProduct.status,
      // };
      const res = await createStore({  
        name: selectedProduct.name,
        category: selectedProduct.category,
        status: selectedProduct.status as "In Stock" | "Out of Stock", });
      setProducts((prev) => [...prev, res.data]);

      setIsModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Create store failed", error);
      alert("Failed to create store");
    }
  };

  // const handleDelete = (id: number) => {
  //   const updatedProducts = products.filter(
  //     (product) => product.id !== id);
  //   setProducts(updatedProducts);
  // };
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this store?");
    if (!confirmDelete)
      return;

    try {
      await deleteStore(id);
      setProducts((prev) => prev.filter((store) => store.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete store");
    }
  };
  console.log("Customers:", storeCustomers);

  // const storeCustomers = customers.filter((customer) => customer.storeId === selectedStoreId);
  return (
    <div >
      <div className="flex items-center justify-between w-full mb-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-6">Store Management</h2>
        <div className="flex items-center gap-2">
          <UserCircle size={28} className="text-gray-800" />
          <span className="text-gray-700 text-bold font-medium">Admin</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        <StatCard
          title="Active Users"
          value="1,245"
          change="-10% compared to last month"
          isPositive
          icon={Users}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
          imgSrc={arrow}
        />
        <StatCard
          title="New Users"
          value="24"
          change="+5% compared to last month"
          isPositive
          icon={Users}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
          imgSrc={piechart}
        />
        <StatCard
          title="Total Users"
          value="1301"
          change="+45% compared to last month"
          isPositive
          icon={Users}
          iconBg="bg-gray-50"
          iconColor="text-gray-600"
          imgSrc={Rainbow}
        />
      </div>
      <div className="Relative-inline-block mt-8">
        <div className="h-10 flex items-center justify-between w-full mb-6 gap-4">
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full max-w-md px-4 py-1 border bg-white text-gray-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div>
            <button className="bg-white text-gray-500 border-gray-300 px-4 py-1 rounded-md hover:bg-white-800 transition"
              onClick={() => {
                setSelectedProduct({
                  // id: Date.now(),
                  name: "",
                  category: "",
                  status: "In Stock",
                }as StoreProduct);
                setIsModalOpen(true);
              }}
            >
              + New Store
            </button>
            <button className="bg-white border-gray-300 text-gray-500 px-4 py-1 rounded-md ml-3"
              onClick={() => setShowFilter(!showFilter)}>
              Filters</button>

            {showFilter && (
              <div className="absolute bg-white text-gray-500 border rounded-md p-2 mt-4">
                {categories.map((category) => (
                  <div
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setShowFilter(false);
                    }}
                    className="cursor-pointer hover:bg-gray-200 px-2 py-1"
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>


        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md">
            <thead className="bg-gray-200">
              <tr>

                <th className="py-2 px-4 text-left text-gray-700 font-medium">Stores</th>
                <th className="py-2 px-4 text-left text-gray-700 font-medium">Category</th>
                <th className="py-2 px-4 text-left text-gray-700 font-medium">Status</th>
                <th className="py-2 px-4 text-left text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product: StoreProduct) => (
                <tr key={product.id} className="border-b text-gray-600 border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-3">{product.name}</td>
                  <td className="py-3 px-3">{product.category}</td>
                  <td className="py-3 px-3">{product.status}</td>
                  <td className="py-3 px-3 space-x-2">
                    {/* <button className="px-3 py-1 bg-gray-500 text-white rounded-md"
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                    >Edit</button> */}
                    <button className="px-3 py-1 bg-gray-500 text-white rounded-md"
                      onClick={() => {
                        handleViewCustomers(product.id);
                        // setSelectedStoreId(product.id);
                        // setLoadingCustomers(true);
                        // setIsViewModalOpen(true);

                      }}
                    >View</button>
                    <button className="px-3 py-1 bg-gray-500 text-white rounded-md"
                      onClick={() => handleDelete(product.id)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            isOpen={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            title="Customer List"
          > {loadingCustomers && (
            <p className="text-center text-gray-500">Loading customers...</p>
          )}

            {!loadingCustomers && storeCustomers.length === 0 && (
              <p className="text-center text-gray-500">No customers found</p>
            )}
            {!loadingCustomers && storeCustomers.length > 0 && (
              <table className="w-full border border-gray-400 text-sm">
                <thead className="bg-gray-500">

                  <tr>
                    <th className="px-2 py-2 text-left">Customer ID</th>
                    <th className="px-2 py-2 text-left">Name</th>
                    <th className="px-2 py-2 text-left">Email</th>
                    <th className="px-2 py-2 text-left">Phone</th>
                    <th className="px-2 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {storeCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t">
                      <td className="px-2 py-2 text-gray-500">{customer.id}</td>
                      <td className="px-2 py-2 text-gray-500">{customer.name}</td>
                      <td className="px-2 py-2 text-gray-500">{customer.email}</td>
                      <td className="px-2 py-2 text-gray-500">{customer.phone}</td>
                      <td className="px-2 py-2 text-gray-500">{customer.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Modal>

          <AddStore
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add Store"
          >
            {selectedProduct && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md bg-gray-500"
                  placeholder="Store Name"
                />

                <input
                  type="text"
                  value={selectedProduct.category}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md bg-gray-500"
                  placeholder="Category"
                />

                <select
                  value={selectedProduct.status}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      status: e.target.value as "In Stock" | "Out of Stock",
                    })
                  }
                  className="w-full px-3 py-2 border rounded-md bg-gray-500"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-1 border rounded-md bg-gray-500"
                  >
                    Cancel
                  </button>

                  <button
                    // onClick={() => {
                    //   if (!selectedProduct)
                    //     return;
                    //   const isEdit = products.some(p => p.id == selectedProduct?.id);
                    //   if (isEdit) {
                    //     setProducts((prev) =>
                    //       prev.map((p) =>
                    //         p.id === selectedProduct.id ? selectedProduct : p
                    //       )
                    //     );
                    //   }
                    //   else {
                    //     setProducts(prev => [...prev, selectedProduct!]);
                    //   }
                    //   setIsModalOpen(false);
                    // }}
                    onClick={handleCreateStore}
                    className="px-4 py-1 bg-gray-500 text-white rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </AddStore>

        </div>
      </div>
    </div>
  );
}
export default DashboardStore;