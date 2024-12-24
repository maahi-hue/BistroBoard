import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";

const FoodPurchase = () => {
  const { user } = useContext(authContext);
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [formData, setFormData] = useState({
    foodName: "",
    price: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFoodDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchFoodDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/food/${id}`
      );
      setFood(data);

      const unitPrice = data.price / data.quantity || 0;

      setFormData({
        foodName: data.name || "",
        price: unitPrice,
        quantity: data.quantity > 0 ? 1 : 0,
      });
    } catch (error) {
      console.error("Failed to fetch food details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedFormData = { ...prev };

      if (name === "quantity" && food) {
        const quantity = Math.min(
          Math.max(parseInt(value, 10), 1),
          food.quantity
        );
        updatedFormData.quantity = quantity;
        updatedFormData.price = (food.price / food.quantity) * quantity;
      } else {
        updatedFormData[name] = value;
      }

      return updatedFormData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const purchaseData = {
      ...formData,
      buyerName: user?.displayName || user?.email.split("@")[0],
      buyerEmail: user?.email || "",
      buyingDate: Date.now(),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/addOrder`,
        purchaseData
      );
      console.log("Purchase response:", response);
      alert("Purchase successful!");
      setFormData({
        foodName: food.name || "",
        price: food.price / food.quantity || 0,
        quantity: 1,
      });
    } catch (error) {
      console.error("Error while purchasing food:", error);
      alert("Failed to complete the purchase.");
    } finally {
      setLoading(false);
    }
  };

  if (!food) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading food details...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Purchase Food
        </h2>
        {food.quantity === 0 ? (
          <p className="text-red-500 font-bold mt-4">
            This item is not available. You cannot purchase it.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label className="text-gray-700" htmlFor="foodName">
                  Food Name
                </label>
                <input
                  id="foodName"
                  name="foodName"
                  value={formData.foodName}
                  type="text"
                  disabled
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="price">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  value={formData.price.toFixed(2)}
                  type="number"
                  disabled
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="quantity">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  max={food.quantity}
                  required
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                />
                <p className="text-sm text-gray-500">
                  Available stock: {food.quantity}
                </p>
              </div>

              <div>
                <label className="text-gray-700" htmlFor="buyerName">
                  Buyer Name
                </label>
                <input
                  id="buyerName"
                  name="buyerName"
                  value={user?.displayName || user?.email.split("@")[0]}
                  type="text"
                  disabled
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
                />
              </div>

              <div>
                <label className="text-gray-700" htmlFor="buyerEmail">
                  Buyer Email
                </label>
                <input
                  id="buyerEmail"
                  name="buyerEmail"
                  value={user?.email || ""}
                  type="email"
                  disabled
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-200 rounded-md focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={food.quantity === 0 || loading}
                className={`px-8 py-2.5 leading-5 text-white transition-colors duration-300 rounded-md focus:outline-none ${
                  food.quantity === 0
                    ? "bg-gray-300 cursor-not-allowed opacity-50"
                    : "bg-gray-700 hover:bg-gray-600 focus:bg-gray-600 cursor-pointer"
                }`}
              >
                {loading ? "Processing..." : "Purchase"}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default FoodPurchase;
