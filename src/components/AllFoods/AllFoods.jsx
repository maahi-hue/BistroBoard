import { useEffect, useState } from "react";
import FoodCard from "../FoodCard/FoodCard";
import axios from "axios";

const AllFoods = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchAllFoods = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/allFoods?search=${search}`
      );
      setFoods(data);
    };
    fetchAllFoods();
  }, [search]);

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
          <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 text-gray-700 placeholder-gray-500  outline-none focus:placeholder-transparent"
              type="text"
              name="search"
              onBlur={(e) => setSearch(e.target.value)}
              placeholder="Enter Food Name"
              aria-label="Enter Food Name"
            />

            <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food}></FoodCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFoods;
