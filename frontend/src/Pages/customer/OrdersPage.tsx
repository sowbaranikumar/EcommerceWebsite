import { useState, useEffect } from "react";
// import ordersData from "../../data/orders.json";
import type { Order, OrderItem} from "../../types/orders";
import { getOrders } from "../../services/orderApi";

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchOrders=async()=>{
      try{
        const data=await getOrders();
        console.log("Modifies response",data);
        setOrders(data);
      }
      catch (error) {
        console.error("Error fetching customers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  },[]);

  return (
    <div className="max-w-8xl mx-auto px-4 pt-8 pb-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-600 text-left">
        My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const total = order.items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            return (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-700">
                    Order #{order.orderNumber}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-white font-bold text-sm ${
                      order.status === "Delivered"
                        ? "bg-green-500"
                        : order.status === "Returned"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-2">Date: {order.date}</p>

                <div className="space-y-1">
                  {order.items.map((item: OrderItem, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between text-gray-700"
                    >
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-2 font-bold text-gray-700">
                  Total: ₹{total}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
