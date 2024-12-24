import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SingleFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error("Failed to fetch food details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseRedirect = () => {
    navigate(`/purchase/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading food details...</p>
      </div>
    );
  }

  if (!food) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Food item not found.</p>
      </div>
    );
  }

  return (
    <div className="my-12 ">
      <section className="flex flex-row p-8 mx-auto bg-white rounded-md shadow-md w-2/4 items-center justify-center gap-6">
        <div className="w-3/1">
          <h2 className="text-xl font-bold text-gray-800">{food.name}</h2>
          {food.image && (
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-32 object-cover rounded-md my-4"
            />
          )}
        </div>
        <div className="mt-4 w-3/1">
          <p>
            <strong>Price:</strong> {food.price} TK
          </p>
          <p>
            <strong>Quantity Available:</strong> {food.quantity}
          </p>
          <p>
            <strong>Category:</strong> {food.category}
          </p>
          <p>
            <strong>Description:</strong> {food.description}
          </p>
          <p>
            <strong>Purchase Count:</strong> {food.purchase_count || 0}
          </p>
        </div>
        <button
          onClick={handlePurchaseRedirect}
          className="w-3/1 px-4 py-2 mt-6 btn hover:bg-[#354f52] hover:text-[#cad2c5] font-bold rounded"
        >
          Purchase
        </button>
      </section>
    </div>
  );
};

export default SingleFood;
