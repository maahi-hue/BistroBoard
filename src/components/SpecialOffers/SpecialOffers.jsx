import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const SpecialOffers = () => {
  const axiosSecure = useAxiosSecure();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchSpecialOffers = async () => {
      const { data } = await axiosSecure.get(`/offer`);
      setOffers(data);
    };
    fetchSpecialOffers();
  }, []);

  return (
    <div className="w-full p-8">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Special Offers
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {offers.map((offer) => (
          <div
            key={offer._id}
            className="relative border border-gray-500 p-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold uppercase py-1 px-3 rounded-full">
              {offer.discount}% Off
            </div>

            <div
              className="h-48 w-48 bg-cover bg-center rounded-full mx-auto mb-4 flex items-center justify-center transition duration-300 transform hover:scale-110"
              style={{ backgroundImage: `url(${offer.image})` }}
            ></div>

            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{offer.name}</h2>
              <p className="text-sm mb-4">{offer.description}</p>
              <div className="flex justify-center items-center space-x-4">
                <p className="text-lg font-bold line-through text-gray-500">
                  ${offer.originalPrice}
                </p>
                <p className="text-lg font-bold text-red-500">
                  ${offer.discountedPrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOffers;
