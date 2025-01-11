import { Link } from "react-router-dom";

const FoodCard = ({ food }) => {
  const { _id, name, category, quantity, origin, price, image } = food || {};
  return (
    <div
      className="relative border border-gray-500 w-full max-w-sm h-64 rounded-md shadow-md hover:scale-[1.05] transition-all overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col h-full p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full">
            {category}
          </span>
          <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full">
            {origin}
          </span>
        </div>

        <div className="flex-1">
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="mt-2 text-sm font-bold">Quantity: {quantity}</p>
          <p className="mt-2 text-sm font-bold">{price} TK</p>
        </div>

        <div>
          <Link
            to={`/food/${_id}`}
            className="block w-full px-4 py-2 text-center bt rounded-md hover:bg-[#d68853] hover:text-[#1c1858] border border-inherit  font-bold"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
