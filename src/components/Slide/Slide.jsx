/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Slide = ({ image, header, description }) => {
  return (
    <div
      className="w-full bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center justify-center w-full h-full bg-gray-900/70">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold lg:text-5xl">{header}</h2>
          <p className="mt-4 text-lg lg:text-xl">{description}</p>
          <br />
          <Link
            to="/AllFoods"
            className="w-full px-5 py-4 mt-4 text-sm text-black font-bold hover:bg-[#354f52] hover:text-[#cad2c5] capitalize transition-colors duration-300 transform rounded-md lg:w-auto bg-white"
          >
            All Foods
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slide;
