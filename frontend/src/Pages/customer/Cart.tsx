import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import {
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
} from "../../redux/slices/cartSlices";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const [orderMessage, setOrderMessage] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleBuyNow = (itemName: string) => {
    setOrderMessage(`Order for "${itemName}" placed successfully!`);
    setTimeout(() => setOrderMessage(""), 3000);
  };

  const handleBuyAll = () => {
    if (cartItems.length === 0) return;

    setOrderMessage("Order for all items placed successfully!");
    dispatch(clearCart());

    setTimeout(() => setOrderMessage(""), 3000);
  };

  return (
    <div className="max-w-8xl mx-auto px-4 pt-8 pb-8 bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-600 text-left">
        MyCart
      </h2>

      {orderMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
          {orderMessage}
        </div>
      )}

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border rounded-lg p-4"
              >
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-500 text-lg">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-gray-500 font-medium">
                    ₹{item.price}
                  </p>
                </div>


                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decreaseQty(item.id))}
                    className="border bg-gray-500 px-2 rounded"
                  >
                    −
                  </button>
                  <span className="px-2 font-semibold text-gray-500">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQty(item.id))}
                    className="border bg-gray-500 px-2 rounded"
                  >
                    +
                  </button>
                  <p className="w-28 text-right font-bold text-gray-700">
                    ₹{item.price * item.quantity}
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleBuyNow(item.name)}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Buy Now
                  </button>
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <h2 className="text-xl text-gray-500 font-bold">
              Total: ₹{total}
            </h2>
            <button
              onClick={handleBuyAll}
              className="bg-gray-500 text-white px-6 py-2 rounded"
            >
              Buy All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
