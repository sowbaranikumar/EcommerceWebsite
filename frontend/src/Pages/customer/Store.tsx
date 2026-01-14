import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductsData, Product } from "../../types/products";
import { productIconConfig } from "../../config/productIconConfig";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlices";
import type { AppDispatch } from "../../redux/store";
import { getProductsGrouped } from "../../services/productApi";

const Store = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [data, setData] = useState<ProductsData>({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProductsGrouped();
      setData(res.data);
      const categories = Object.keys(res.data);
      if (categories.length > 0) {
        setSelectedCategory(categories[0]);
      }
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (product: Product) => {
    dispatch(addToCart(product));
    navigate("/home/cart");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-600">
        MyStore
      </h2>

      
      <div className="flex gap-4 mb-6 items-center justify-center">
        {Object.keys(data).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? "bg-gray-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

   
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
        {data[selectedCategory]?.map((product: Product) => {
          const Icon = productIconConfig[product.name];

          return (
            <div
              key={product.id}
              className="w-full max-w-xs bg-white border rounded-lg shadow hover:shadow-lg transition flex flex-col items-center gap-4 p-6"
            >
              {Icon && <Icon className="text-3xl text-gray-500" />}

              <div>
                <h2 className="text-lg font-semibold text-gray-600 text-center">
                  {product.name}
                </h2>
                <p className="text-gray-700 text-center">
                  ₹{product.price}
                </p>
              </div>

              <button
                onClick={() => handleClick(product)}
                className="mt-2 px-4 py-1 bg-gray-500 text-white rounded"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Store;
