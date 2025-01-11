import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const SingleFood = () => {
  const axiosSecure = useAxiosSecure();
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
      const { data } = await axiosSecure.get(`/food/${id}`);
      setFood(data);
    } catch (error) {
      // console.error("Failed to fetch food details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseRedirect = () => {
    navigate(`/purchase/${id}`);
  };

  if (loading) return <LoadingSpinner />;

  if (!food) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Food item not found.</p>
      </div>
    );
  }

  return (
    <div className="my-12 px-4">
      <section className="flex flex-col md:flex-row md:p-8 mx-auto bg-white rounded-md shadow-md w-full md:w-3/4 items-center gap-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-bold text-gray-800">{food.name}</h2>
          {food.image && (
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 md:h-64 object-cover rounded-md my-4"
            />
          )}
        </div>
        <div className="w-full md:w-1/2">
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
          <button
            onClick={handlePurchaseRedirect}
            className="w-full px-4 py-2 mt-6 btn hover:bg-[#354f52] hover:text-[#cad2c5] font-bold rounded"
          >
            Purchase
          </button>
        </div>
      </section>
    </div>
  );
};

export default SingleFood;
