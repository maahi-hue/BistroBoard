/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  const { _id, name, category, quantity, origin, description, price } =
    food || {};
  return (
    <div className="w-full max-w-sm px-4 py-3 rounded-md shadow-md hover:scale-[1.05] transition-all">
      <div className="flex items-center justify-between">
        <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full">
          {category}
        </span>
        <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full">
          {origin}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800">{name}</h1>

        <p className="mt-2 text-sm text-gray-600">{description}</p>
        <p className="mt-2 text-sm font-bold text-gray-600">
          Quantity: {quantity}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600">{price} TK</p>
      </div>
      <div className="mt-4">
        <Link
          to={`/food/${_id}`}
          className="px-4 py-2 btn hover:bg-[#354f52] hover:text-[#cad2c5] font-bold"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;
