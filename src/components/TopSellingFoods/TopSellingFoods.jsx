import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../FoodCard/FoodCard";
import { Link } from "react-router-dom";

const TopSellingFoods = () => {
  const [topFoods, setTopFoods] = useState([]);

  useEffect(() => {
    const fetchTopSellingFoods = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/foods`
        );
        setTopFoods(data);
      } catch (error) {
        // console.error("Error fetching top foods:", error);
      }
    };
    fetchTopSellingFoods();
  }, []);

  return (
    <div className="container px-6 py-10 mx-auto">
      <h1 className="text-2xl font-semibold text-center capitalize lg:text-3xl">
        Top 6 Best-Selling Foods
      </h1>
      <p className="max-w-2xl mx-auto my-6 text-center">
        These are the most popular foods based on the number of purchases
      </p>
      <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {topFoods.map((food) => (
          <FoodCard key={food._id} food={food}></FoodCard>
        ))}
      </div>
      <Link
        to={`/AllFoods`}
        className="px-4 py-2 mt-4 mx-auto flex w-48 btn hover:bg-[#354f52] hover:text-[#cad2c5] font-bold"
      >
        Sea All
      </Link>
    </div>
  );
};

export default TopSellingFoods;
