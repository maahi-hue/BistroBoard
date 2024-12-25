import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const FoodPurchase = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(authContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [formData, setFormData] = useState({
    foodName: "",
    price: "",
    quantity: 1,
    buyingDate: new Date().toLocaleString(),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFoodDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchFoodDetails = async () => {
    try {
      const { data } = await axiosSecure.get(`/food/${id}`);
      setFood(data);

      const unitPrice = data.price / data.quantity || 0;

      setFormData((prev) => ({
        ...prev,
        foodName: data.name || "",
        price: unitPrice,
        quantity: data.quantity > 0 ? 1 : 0,
      }));
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
      foodId: id,
      buyerName: user?.displayName || user?.email.split("@")[0],
      buyerEmail: user?.email || "",
      buyingDate: new Date().toISOString(),
    };

    try {
      const response = await axiosSecure.post(`/addOrder`, purchaseData);
      Swal.fire({
        icon: "success",
        title: "Purchase Successful!",
        text: "Your order has been placed successfully.",
        confirmButtonText: "Go to My Orders",
      }).then(() => {
        navigate("/myOrders");
      });
      console.log(response);
    } catch (error) {
      console.error("Error while purchasing food:", error);
      Swal.fire({
        icon: "error",
        title: "Purchase Failed",
        text: "We encountered an issue while processing your purchase. Please try again.",
      });
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

              <div>
                <label className="text-gray-700" htmlFor="buyingDate">
                  Buying Date
                </label>
                <input
                  id="buyingDate"
                  name="buyingDate"
                  value={formData.buyingDate}
                  type="text"
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
                    : "bg-green-600 hover:bg-green-500 focus:bg-green-500 cursor-pointer"
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
