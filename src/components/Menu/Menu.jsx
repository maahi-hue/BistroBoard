import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const Menu = () => {
  const axiosSecure = useAxiosSecure();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchAllMenu = async () => {
      const { data } = await axiosSecure.get(`/menu`);
      setMenuItems(data);
    };
    fetchAllMenu();
  }, []);

  return (
    <div className="w-full p-8">
      <h1 className="text-4xl font-semibold text-center mb-8">Our Menu</h1>

      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item._id}
            className="flex items-center border-b border-gray-300 pb-4"
          >
            <div className="flex-grow">
              <h2 className="text-lg font-semibold hover:text-[#1c1858] transition-colors">
                {item.name}
              </h2>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>

            <p className="text-lg font-bold text-gray-900">${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
