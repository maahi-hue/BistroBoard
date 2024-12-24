/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  const { image, name, category, quantity, origin, description, price } =
    food || {};
  return (
    <Link
      to={`/food/1`}
      className="w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-light text-gray-800 ">{image}</span>
        <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full ">
          {category}
        </span>
        <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full ">
          {origin}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800 ">{name}</h1>

        <p className="mt-2 text-sm text-gray-600 ">{description}</p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">{quantity}</p>
        <p className="mt-2 text-sm font-bold text-gray-600 ">{price} TK</p>
      </div>
    </Link>
  );
};

export default FoodCard;
